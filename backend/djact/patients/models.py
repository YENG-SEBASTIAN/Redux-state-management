# patients/models.py
from django.db import models
from accounts.models import User
from django.contrib.postgres.fields import ArrayField
from encrypted_model_fields.fields import EncryptedTextField, EncryptedCharField

class PatientProfile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    MARITAL_STATUS_CHOICES = [
        ('single', 'Single'),
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('widowed', 'Widowed'),
        ('other', 'Other'),
    ]

    patient_first_name = models.CharField(max_length=100)
    patient_last_name = models.CharField(max_length=100)
    address = EncryptedTextField()
    phone_number = EncryptedCharField(max_length=15)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    emergency_contact_name = EncryptedCharField(max_length=255)
    emergency_contact_phone = EncryptedCharField(max_length=15)
    blood_type = models.CharField(max_length=3)
    marital_status = models.CharField(max_length=15, choices=MARITAL_STATUS_CHOICES)
    insurance_provider = EncryptedCharField(max_length=100)
    insurance_number = EncryptedCharField(max_length=50)

    def __str__(self):
        return f"{self.patient_first_name} {self.patient_last_name}"

class MedicalHistory(models.Model):
    CONDITION_STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('resolved', 'Resolved'),
    ]

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='medical_histories')
    condition = models.CharField(max_length=255)
    date_diagnosed = models.DateField()
    notes = models.TextField(blank=True, null=True)
    current_status = models.CharField(max_length=50, choices=CONDITION_STATUS_CHOICES)

    def __str__(self):
        return f"{self.condition} ({self.patient.patient_first_name} {self.patient.patient_last_name})"

class Allergy(models.Model):
    SEVERITY_CHOICES = [
        ('mild', 'Mild'),
        ('moderate', 'Moderate'),
        ('severe', 'Severe'),
    ]

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='allergies')
    allergen = models.CharField(max_length=100)
    reaction = models.TextField()
    severity = models.CharField(max_length=50, choices=SEVERITY_CHOICES)

    def __str__(self):
        return f"{self.allergen} ({self.patient.patient_first_name} {self.patient.patient_last_name})"

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
        return f"{self.name} ({self.patient.patient_first_name} {self.patient.patient_last_name})"