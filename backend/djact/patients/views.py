from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from patients.models import (Registration, PatientProfile, MedicalHistory, Allergy, Medication, Vitals)
from patients.serializers import (RegistrationSerializer, PatientProfileSerializer, 
                                  MedicalHistorySerializer, AllergySerializer, MedicationSerializer, 
                                  VitalsSerializer)

class RegistrationListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = Registration.objects.all()
        serializer = RegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistrationDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, patient_id):
        try:
            return Registration.objects.get(patient_id=patient_id)
        except Registration.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, patient_id):
        registration = self.get_object(patient_id)
        serializer = RegistrationSerializer(registration)
        return Response(serializer.data)

    def put(self, request, patient_id):
        registration = self.get_object(patient_id)
        serializer = RegistrationSerializer(registration, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, patient_id):
        registration = self.get_object(patient_id)
        registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PatientProfileListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patient_profiles = PatientProfile.objects.all()
        serializer = PatientProfileSerializer(patient_profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PatientProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientProfileDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return PatientProfile.objects.get(pk=pk)
        except PatientProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        patient_profile = self.get_object(pk)
        serializer = PatientProfileSerializer(patient_profile)
        return Response(serializer.data)

    def put(self, request, pk):
        patient_profile = self.get_object(pk)
        serializer = PatientProfileSerializer(patient_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        patient_profile = self.get_object(pk)
        patient_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicalHistoryListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        medical_history = MedicalHistory.objects.all()
        serializer = MedicalHistorySerializer(medical_history, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicalHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class MedicalHistoryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return MedicalHistory.objects.get(pk=pk)
        except MedicalHistory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        medical_history = self.get_object(pk)
        serializer = MedicalHistorySerializer(medical_history)
        return Response(serializer.data)

    def put(self, request, pk):
        medical_history = self.get_object(pk)
        serializer = MedicalHistorySerializer(medical_history, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        medical_history = self.get_object(pk)
        medical_history.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class AllergyListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        allergies = Allergy.objects.all()
        serializer = AllergySerializer(allergies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AllergySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllergyDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Allergy.objects.get(pk=pk)
        except Allergy.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        allergy = self.get_object(pk)
        serializer = AllergySerializer(allergy)
        return Response(serializer.data)

    def put(self, request, pk):
        allergy = self.get_object(pk)
        serializer = AllergySerializer(allergy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        allergy = self.get_object(pk)
        allergy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class MedicationListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        medications = Medication.objects.all()
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicationDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Medication.objects.get(pk=pk)
        except Medication.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        medication = self.get_object(pk)
        serializer = MedicationSerializer(medication)
        return Response(serializer.data)

    def put(self, request, pk):
        medication = self.get_object(pk)
        serializer = MedicationSerializer(medication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        medication = self.get_object(pk)
        medication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class VitalsListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vitals = Vitals.objects.all()
        serializer = VitalsSerializer(vitals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VitalsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VitalsDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Vitals.objects.get(pk=pk)
        except Vitals.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        vitals = self.get_object(pk)
        serializer = VitalsSerializer(vitals)
        return Response(serializer.data)

    def put(self, request, pk):
        vitals = self.get_object(pk)
        serializer = VitalsSerializer(vitals, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)