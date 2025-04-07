from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.utils import timezone
from cryptography.fernet import Fernet
from django.conf import settings
import base64

# Generate a key for encryption
key = base64.urlsafe_b64encode(settings.SECRET_KEY.encode()[:32])
fernet = Fernet(key)

class EncryptedField(models.TextField):
    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return fernet.decrypt(value.encode()).decode()

    def to_python(self, value):
        if value is None:
            return value
        return fernet.decrypt(value.encode()).decode()

    def get_prep_value(self, value):
        if value is None:
            return value
        return fernet.encrypt(value.encode()).decode()

class Company(models.Model):
    name = models.CharField(max_length=255)
    registration_date = models.DateField()
    registration_number = EncryptedField()  # Encrypted for privacy
    address = models.TextField()
    contact_person = models.CharField(max_length=255)
    number_of_employees = models.IntegerField(validators=[MinValueValidator(0)])
    contact_phone = EncryptedField()  # Encrypted for privacy
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='departments')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.company.name}"

class Employee(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    name = models.CharField(max_length=255)
    employee_id = EncryptedField()  # Encrypted for privacy
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
    role = models.CharField(max_length=255)
    date_started = models.DateField()
    date_left = models.DateField(null=True, blank=True)
    duties = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.company.name}"

class EmployeeHistory(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='history')
    role = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    date_started = models.DateField()
    date_left = models.DateField(null=True, blank=True)
    duties = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.name} - {self.role} ({self.date_started} to {self.date_left or 'Present'})"
