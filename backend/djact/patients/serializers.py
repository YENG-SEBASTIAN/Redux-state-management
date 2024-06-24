from rest_framework import serializers
from patients.models import Registration, PatientProfile, MedicalHistory, Allergy, Medication, Vitals

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ('patient_id',)

class PatientProfileSerializer(serializers.ModelSerializer):
    patient = RegistrationSerializer()

    class Meta:
        model = PatientProfile
        fields = '__all__'

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = '__all__'

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = '__all__'

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class VitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vitals
        fields = '__all__'
