# Talent Verify Backend

This is the backend service for the Talent Verify application, built with Django and Django REST Framework.

## Features

- Company management
- Department management
- Employee management with history tracking
- Bulk employee data upload via CSV/Excel
- JWT-based authentication
- Encrypted sensitive data
- RESTful API endpoints

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser:
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

## API Endpoints

### Authentication
- POST /api/token/ - Get JWT token
- POST /api/token/refresh/ - Refresh JWT token

### Companies
- GET /api/companies/ - List all companies
- POST /api/companies/ - Create a new company
- GET /api/companies/{id}/ - Get company details
- PUT /api/companies/{id}/ - Update company
- DELETE /api/companies/{id}/ - Delete company
- POST /api/companies/{id}/bulk_upload_employees/ - Bulk upload employees

### Departments
- GET /api/departments/ - List all departments
- POST /api/departments/ - Create a new department
- GET /api/departments/{id}/ - Get department details
- PUT /api/departments/{id}/ - Update department
- DELETE /api/departments/{id}/ - Delete department

### Employees
- GET /api/employees/ - List all employees
- POST /api/employees/ - Create a new employee
- GET /api/employees/{id}/ - Get employee details
- PUT /api/employees/{id}/ - Update employee
- DELETE /api/employees/{id}/ - Delete employee

## Security Features

1. **Data Encryption**:
   - Employee ID numbers
   - Company registration numbers
   - Contact phone numbers

2. **Authentication**:
   - JWT-based authentication
   - Token refresh mechanism
   - Secure password storage

3. **Authorization**:
   - Role-based access control
   - API endpoint protection

## Testing

To run tests:
```bash
python manage.py test
```

## Deployment

The application can be deployed to any cloud platform that supports Python/Django applications. For production:

1. Set `DEBUG = False`
2. Configure proper database settings
3. Set up proper CORS settings
4. Configure static files serving
5. Set up proper security headers
6. Use environment variables for sensitive data

## Potential Weaknesses and Mitigations

1. **Data Security**:
   - Weakness: Sensitive data exposure
   - Mitigation: Encryption of sensitive fields, secure API endpoints

2. **Performance**:
   - Weakness: Large bulk uploads may timeout
   - Mitigation: Implement background task processing

3. **Scalability**:
   - Weakness: Single database instance
   - Mitigation: Use database replication and caching

4. **API Security**:
   - Weakness: Potential API abuse
   - Mitigation: Rate limiting, request validation

## Stress Testing

The application includes stress tests for:
- Bulk data uploads
- Concurrent API requests
- Database query performance
- Memory usage under load

To run stress tests:
```bash
python manage.py test talent_verify.tests.test_stress
``` 