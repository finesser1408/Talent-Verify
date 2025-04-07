from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Company, Department, Employee
from django.contrib.auth.models import User
import concurrent.futures
import time
from datetime import date
import random
import string

class StressTests(TestCase):
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

    def generate_random_string(self, length=10):
        """Generate a random string of specified length"""
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    def test_concurrent_employee_creation(self):
        """Test concurrent employee creation"""
        def create_employee():
            data = {
                'company': self.company.id,
                'name': self.generate_random_string(),
                'employee_id': f'EMP{self.generate_random_string(6)}',
                'department': self.department.id,
                'role': self.generate_random_string(),
                'date_started': '2020-01-01',
                'duties': self.generate_random_string(50)
            }
            response = self.client.post(
                reverse('employee-list'),
                data,
                format='json'
            )
            return response.status_code

        # Create 100 employees concurrently
        start_time = time.time()
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(create_employee) for _ in range(100)]
            results = [f.result() for f in futures]

        end_time = time.time()
        execution_time = end_time - start_time
        
        # Verify all requests were successful
        self.assertTrue(all(code == status.HTTP_201_CREATED for code in results))
        self.assertEqual(Employee.objects.count(), 100)
        
        print(f"Concurrent employee creation test completed in {execution_time:.2f} seconds")

    def test_bulk_upload_performance(self):
        """Test performance of bulk employee upload"""
        # Generate large CSV data
        csv_data = "name,employee_id,department,role,date_started,date_left,duties\n"
        for i in range(1000):
            csv_data += f"{self.generate_random_string()},{self.generate_random_string()},Test Department,{self.generate_random_string()},2020-01-01,,{self.generate_random_string(50)}\n"

        start_time = time.time()
        response = self.client.post(
            reverse('company-bulk-upload-employees', args=[self.company.id]),
            {'file': ('employees.csv', csv_data, 'text/csv')},
            format='multipart'
        )
        end_time = time.time()
        execution_time = end_time - start_time

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 1000)
        
        print(f"Bulk upload of 1000 employees completed in {execution_time:.2f} seconds")

    def test_concurrent_search_requests(self):
        """Test concurrent search requests"""
        # Create 100 employees with different roles
        roles = ['Developer', 'Designer', 'Manager', 'Tester']
        for i in range(100):
            Employee.objects.create(
                company=self.company,
                name=f'Employee {i}',
                employee_id=f'EMP{i}',
                department=self.department,
                role=random.choice(roles),
                date_started=date(2020, 1, 1),
                duties='Test duties'
            )

        def perform_search():
            role = random.choice(roles)
            response = self.client.get(
                f"{reverse('employee-list')}?role={role}"
            )
            return response.status_code

        # Perform 1000 concurrent searches
        start_time = time.time()
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            futures = [executor.submit(perform_search) for _ in range(1000)]
            results = [f.result() for f in futures]

        end_time = time.time()
        execution_time = end_time - start_time
        
        # Verify all requests were successful
        self.assertTrue(all(code == status.HTTP_200_OK for code in results))
        
        print(f"1000 concurrent search requests completed in {execution_time:.2f} seconds")

    def test_memory_usage(self):
        """Test memory usage with large dataset"""
        # Create 10,000 employees
        start_time = time.time()
        for i in range(10000):
            Employee.objects.create(
                company=self.company,
                name=f'Employee {i}',
                employee_id=f'EMP{i}',
                department=self.department,
                role='Developer',
                date_started=date(2020, 1, 1),
                duties='Test duties'
            )
        end_time = time.time()
        creation_time = end_time - start_time

        # Test retrieval of all employees
        start_time = time.time()
        response = self.client.get(reverse('employee-list'))
        end_time = time.time()
        retrieval_time = end_time - start_time

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 10000)
        
        print(f"Created 10,000 employees in {creation_time:.2f} seconds")
        print(f"Retrieved 10,000 employees in {retrieval_time:.2f} seconds") 