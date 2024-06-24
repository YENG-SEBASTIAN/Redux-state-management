from django.contrib import admin
from patients.models import Registration, PatientProfile, MedicalHistory, Allergy, Medication, Vitals

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('patient_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'contact_number', 'email')
    search_fields = ('first_name', 'last_name', 'email', 'patient_id')
    list_filter = ('gender',)

@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ('patient', 'phone_number', 'date_of_birth', 'gender', 'emergency_contact_name', 'blood_type', 'marital_status', 'insurance_provider')
    search_fields = ('patient__first_name', 'patient__last_name', 'emergency_contact_name')
    list_filter = ('gender', 'marital_status', 'blood_type')

@admin.register(MedicalHistory)
class MedicalHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'condition', 'date_diagnosed', 'current_status')
    search_fields = ('patient__patient__first_name', 'patient__patient__last_name', 'condition')
    list_filter = ('current_status', 'date_diagnosed')

@admin.register(Allergy)
class AllergyAdmin(admin.ModelAdmin):
    list_display = ('patient', 'allergen', 'reaction', 'severity')
    search_fields = ('patient__patient__first_name', 'patient__patient__last_name', 'allergen')
    list_filter = ('severity',)

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ('patient', 'name_of_medication', 'dosage', 'start_date', 'end_date', 'frequency', 'prescribing_doctor')
    search_fields = ('patient__patient__first_name', 'patient__patient__last_name', 'name_of_medication', 'prescribing_doctor__username')
    list_filter = ('start_date', 'end_date', 'frequency')

@admin.register(Vitals)
class VitalsAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date_recorded', 'temperature', 'blood_pressure', 'heart_rate', 'respiratory_rate')
    search_fields = ('patient__first_name', 'patient__last_name', 'date_recorded')
    list_filter = ('date_recorded',)

