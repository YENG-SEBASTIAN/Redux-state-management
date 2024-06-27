from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from patients.models import (Registration, PatientProfile, MedicalHistory, Allergy, Medication, Vitals)
from patients.serializers import (RegistrationSerializer, PatientProfileSerializer, 
                                  MedicalHistorySerializer, AllergySerializer, MedicationSerializer, 
                                  VitalsSerializer)
from rest_framework.permissions import DjangoModelPermissions


class RegistrationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class RegistrationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    
class PatientProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class PatientProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]


class MedicalHistoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    
class MedicalHistoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    
class AllergyListCreateAPIView(generics.ListCreateAPIView):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class AllergyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]



class MedicationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

class MedicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]



class VitalsListCreateAPIView(generics.ListCreateAPIView):
    queryset = Vitals.objects.all()
    serializer_class = VitalsSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class VitalsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vitals.objects.all()
    serializer_class = VitalsSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
