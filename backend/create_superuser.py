import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

try:
    user, created = User.objects.get_or_create(
        username='Allan',
        defaults={
            'email': 'allan@example.com',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if not created:
        print("User already exists. Updating password...")
    user.set_password('1234')
    user.save()
    print("Superuser created/updated successfully!")
except Exception as e:
    print(f"Error creating/updating superuser: {e}") 