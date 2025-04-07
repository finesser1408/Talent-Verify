from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Company, Department, Employee, EmployeeHistory
from .serializers import (
    CompanySerializer, DepartmentSerializer, 
    EmployeeSerializer, EmployeeHistorySerializer,
    BulkEmployeeUploadSerializer
)
import pandas as pd
from datetime import datetime

# Create your views here.

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def bulk_upload_employees(self, request, pk=None):
        company = self.get_object()
        serializer = BulkEmployeeUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            file = request.FILES['file']
            try:
                if file.name.endswith('.csv'):
                    df = pd.read_csv(file)
                else:
                    df = pd.read_excel(file)
                
                employees_created = 0
                for _, row in df.iterrows():
                    department_name = row.get('department')
                    department = None
                    if department_name:
                        department, _ = Department.objects.get_or_create(
                            company=company,
                            name=department_name
                        )
                    
                    employee = Employee.objects.create(
                        company=company,
                        name=row['name'],
                        employee_id=row.get('employee_id', ''),
                        department=department,
                        role=row['role'],
                        date_started=datetime.strptime(row['date_started'], '%Y-%m-%d').date(),
                        date_left=datetime.strptime(row['date_left'], '%Y-%m-%d').date() if pd.notna(row.get('date_left')) else None,
                        duties=row.get('duties', '')
                    )
                    
                    # Create history entry
                    EmployeeHistory.objects.create(
                        employee=employee,
                        role=row['role'],
                        department=department,
                        date_started=datetime.strptime(row['date_started'], '%Y-%m-%d').date(),
                        date_left=datetime.strptime(row['date_left'], '%Y-%m-%d').date() if pd.notna(row.get('date_left')) else None,
                        duties=row.get('duties', '')
                    )
                    employees_created += 1
                
                return Response({
                    'message': f'Successfully created {employees_created} employees',
                    'company': CompanySerializer(company).data
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        company_id = self.request.query_params.get('company_id')
        if company_id:
            return Department.objects.filter(company_id=company_id)
        return Department.objects.all()

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Employee.objects.all()
        
        # Filter by company
        company_id = self.request.query_params.get('company_id')
        if company_id:
            queryset = queryset.filter(company_id=company_id)
        
        # Filter by department
        department_id = self.request.query_params.get('department_id')
        if department_id:
            queryset = queryset.filter(department_id=department_id)
        
        # Filter by role
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role__icontains=role)
        
        # Filter by year started
        year_started = self.request.query_params.get('year_started')
        if year_started:
            queryset = queryset.filter(date_started__year=year_started)
        
        # Filter by year left
        year_left = self.request.query_params.get('year_left')
        if year_left:
            queryset = queryset.filter(date_left__year=year_left)
        
        return queryset

    def perform_update(self, serializer):
        instance = serializer.instance
        old_role = instance.role
        old_department = instance.department
        old_date_started = instance.date_started
        old_date_left = instance.date_left
        old_duties = instance.duties
        
        serializer.save()
        
        # Create history entry if any relevant fields changed
        if (instance.role != old_role or 
            instance.department != old_department or 
            instance.date_started != old_date_started or 
            instance.date_left != old_date_left or 
            instance.duties != old_duties):
            
            EmployeeHistory.objects.create(
                employee=instance,
                role=old_role,
                department=old_department,
                date_started=old_date_started,
                date_left=old_date_left,
                duties=old_duties
            )
