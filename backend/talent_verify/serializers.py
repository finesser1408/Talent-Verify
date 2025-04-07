from rest_framework import serializers
from .models import Company, Department, Employee, EmployeeHistory

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class CompanySerializer(serializers.ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'registration_date', 'registration_number', 
                 'address', 'contact_person', 'number_of_employees', 
                 'contact_phone', 'email', 'departments', 'created_at', 'updated_at']

class EmployeeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeHistory
        fields = ['id', 'role', 'department', 'date_started', 'date_left', 
                 'duties', 'created_at']

class EmployeeSerializer(serializers.ModelSerializer):
    history = EmployeeHistorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Employee
        fields = ['id', 'company', 'name', 'employee_id', 'department', 
                 'role', 'date_started', 'date_left', 'duties', 'history',
                 'created_at', 'updated_at']

class BulkEmployeeUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    
    def validate_file(self, value):
        if not value.name.endswith(('.csv', '.xlsx', '.xls')):
            raise serializers.ValidationError("File must be CSV or Excel format")
        return value 