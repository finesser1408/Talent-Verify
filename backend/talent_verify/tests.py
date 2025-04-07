from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Company, Department, Employee, EmployeeHistory
from django.contrib.auth.models import User
import json
from datetime import date

class TalentVerifyTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        # Create test company
        self.company = Company.objects.create(
            name='Test Company',
            registration_date=date(2020, 1, 1),
            registration_number='123456',
            address='123 Test St',
            contact_person='John Doe',
            number_of_employees=10,
            contact_phone='1234567890',
            email='test@company.com'
        )
        
        # Create test department
        self.department = Department.objects.create(
            company=self.company,
            name='Test Department',
            description='Test Description'
        )

    def test_company_creation(self):
        """Test company creation"""
        url = reverse('company-list')
        data = {
            'name': 'New Company',
            'registration_date': '2020-01-01',
            'registration_number': '789012',
            'address': '456 New St',
            'contact_person': 'Jane Doe',
            'number_of_employees': 20,
            'contact_phone': '0987654321',
            'email': 'new@company.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 2)

    def test_employee_creation(self):
        """Test employee creation"""
        url = reverse('employee-list')
        data = {
            'company': self.company.id,
            'name': 'Test Employee',
            'employee_id': 'EMP001',
            'department': self.department.id,
            'role': 'Developer',
            'date_started': '2020-01-01',
            'duties': 'Test duties'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 1)
        self.assertEqual(EmployeeHistory.objects.count(), 1)

    def test_bulk_upload(self):
        """Test bulk employee upload"""
        url = reverse('company-bulk-upload-employees', args=[self.company.id])
        # Create a test CSV file
        csv_data = "name,employee_id,department,role,date_started,date_left,duties\n"
        csv_data += "John Doe,EMP001,Test Department,Developer,2020-01-01,,Test duties\n"
        csv_data += "Jane Smith,EMP002,Test Department,Designer,2020-02-01,,Test duties"
        
        response = self.client.post(
            url,
            {'file': ('employees.csv', csv_data, 'text/csv')},
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 2)
        self.assertEqual(EmployeeHistory.objects.count(), 2)

    def test_employee_search(self):
        """Test employee search functionality"""
        # Create test employee
        Employee.objects.create(
            company=self.company,
            name='Search Test',
            employee_id='EMP003',
            department=self.department,
            role='Tester',
            date_started=date(2020, 1, 1),
            duties='Test duties'
        )
        
        url = reverse('employee-list')
        # Test search by name
        response = self.client.get(f'{url}?name=Search')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
        # Test search by role
        response = self.client.get(f'{url}?role=Tester')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
        # Test search by year started
        response = self.client.get(f'{url}?year_started=2020')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_employee_history(self):
        """Test employee history tracking"""
        employee = Employee.objects.create(
            company=self.company,
            name='History Test',
            employee_id='EMP004',
            department=self.department,
            role='Initial Role',
            date_started=date(2020, 1, 1),
            duties='Initial duties'
        )
        
        # Update employee
        url = reverse('employee-detail', args=[employee.id])
        data = {
            'company': self.company.id,
            'name': 'History Test',
            'employee_id': 'EMP004',
            'department': self.department.id,
            'role': 'Updated Role',
            'date_started': '2020-01-01',
            'duties': 'Updated duties'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check history
        self.assertEqual(EmployeeHistory.objects.count(), 2)
        history = EmployeeHistory.objects.first()
        self.assertEqual(history.role, 'Initial Role')
