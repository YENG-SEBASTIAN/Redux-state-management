from django.db import models
from accounts.models import User
from django.utils.crypto import get_random_string
import string
from django.utils.translation import gettext_lazy as _
from encrypted_model_fields.fields import EncryptedTextField, EncryptedCharField
from accounts.models import User


class Registration(models.Model):
    patient_id = models.CharField(max_length=8, primary_key=True, unique=True, editable=False, default=None)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    @staticmethod
    def generate_patient_id():
        length = 8
        while True:
            unique_id = get_random_string(length, allowed_chars='0123456789')
            if not Registration.objects.filter(patient_id=unique_id).exists():
                return unique_id

    def save(self, *args, **kwargs):
        if not self.patient_id:
            self.patient_id = self.generate_patient_id()
        super().save(*args, **kwargs)


class PatientProfile(models.Model):
    GENDER_CHOICES = [
        ('male', _('Male')),
        ('female', _('Female')),
        ('other', _('Other')),
    ]

    MARITAL_STATUS_CHOICES = [
        ('single', _('Single')),
        ('married', _('Married')),
        ('divorced', _('Divorced')),
        ('widowed', _('Widowed')),
        ('other', _('Other')),
    ]

    patient = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name='profile')
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_phone = models.CharField(max_length=15)
    blood_type = models.CharField(max_length=3)
    marital_status = models.CharField(max_length=15, choices=MARITAL_STATUS_CHOICES)
    insurance_provider = models.CharField(max_length=100)
    insurance_number = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.patient.first_name} {self.patient.last_name}"

class MedicalHistory(models.Model):
    CONDITION_STATUS_CHOICES = [
        ('active', _('Active')),
        ('inactive', _('Inactive')),
        ('resolved', _('Resolved')),
    ]

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='medical_histories')
    condition = models.CharField(max_length=255)
    date_diagnosed = models.DateField()
    notes = EncryptedTextField(blank=True, null=True)
    current_status = models.CharField(max_length=50, choices=CONDITION_STATUS_CHOICES)

    def __str__(self):
        return f"{self.condition} ({self.patient.patient.first_name} {self.patient.patient.last_name})"

class Allergy(models.Model):
    SEVERITY_CHOICES = [
        ('mild', _('Mild')),
        ('moderate', _('Moderate')),
        ('severe', _('Severe')),
    ]

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='allergies')
    allergen = models.CharField(max_length=100)
    reaction = models.TextField()
    severity = models.CharField(max_length=50, choices=SEVERITY_CHOICES)

    def __str__(self):
        return f"{self.allergen} ({self.patient.patient.first_name} {self.patient.patient.last_name})"

class Medication(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='medications')
    name_of_medication = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    frequency = models.CharField(max_length=100)
    prescribing_doctor = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name_of_medication} ({self.patient.patient.first_name} {self.patient.patient.last_name})"

class Vitals(models.Model):
    patient = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name='vitals')
    date_recorded = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    temperature = models.DecimalField(max_digits=4, decimal_places=2)
    blood_pressure = models.DecimalField(max_digits=4, decimal_places=2)
    heart_rate = models.IntegerField()
    respiratory_rate = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on every save

    def __str__(self):
        return f"Vitals on {self.date_recorded} for {self.patient.first_name} {self.patient.last_name}"
