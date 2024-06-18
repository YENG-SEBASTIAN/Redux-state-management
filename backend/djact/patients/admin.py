from django.contrib import admin
from patients.models import PatientProfile, MedicalHistory, Allergy, Medication

@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ('patient_first_name', 'patient_last_name', 'gender', 'date_of_birth', 'marital_status')
    search_fields = ('patient_first_name', 'patient_last_name')
    list_filter = ('gender', 'marital_status')

@admin.register(MedicalHistory)
class MedicalHistoryAdmin(admin.ModelAdmin):
    list_display = ('condition', 'patient', 'date_diagnosed', 'current_status')
    list_filter = ('current_status',)
    search_fields = ('condition', 'patient__patient_first_name', 'patient__patient_last_name')

@admin.register(Allergy)
class AllergyAdmin(admin.ModelAdmin):
    list_display = ('allergen', 'patient', 'severity')
    list_filter = ('severity',)
    search_fields = ('allergen', 'patient__patient_first_name', 'patient__patient_last_name')

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ('name_of_medication', 'patient', 'prescribing_doctor', 'start_date', 'end_date')
    search_fields = ('name_of_medication', 'patient__patient_first_name', 'patient__patient_last_name')
    list_filter = ('start_date', 'end_date')
