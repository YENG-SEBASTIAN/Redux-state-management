from django.urls import path
from patients.views import (
    RegistrationListCreateAPIView, RegistrationDetailAPIView,
    PatientProfileListCreateAPIView, PatientProfileDetailAPIView,
    MedicalHistoryListCreateAPIView, MedicalHistoryDetailAPIView,
    AllergyListCreateAPIView, AllergyDetailAPIView,
    MedicationListCreateAPIView, MedicationDetailAPIView,
    VitalsListCreateAPIView, VitalsDetailAPIView,
)

urlpatterns = [
    # Registration URLs
    path('registrations/', RegistrationListCreateAPIView.as_view(), name='registration-list'),
    path('registrations/<str:patient_id>/', RegistrationDetailAPIView.as_view(), name='registration-detail'),

    # PatientProfile URLs
    path('profiles/', PatientProfileListCreateAPIView.as_view(), name='patientprofile-list'),
    path('profiles/<int:pk>/', PatientProfileDetailAPIView.as_view(), name='patientprofile-detail'),

    # MedicalHistory URLs
    path('medicalhistories/', MedicalHistoryListCreateAPIView.as_view(), name='medicalhistory-list'),
    path('medicalhistories/<int:pk>/', MedicalHistoryDetailAPIView.as_view(), name='medicalhistory-detail'),

    # Allergy URLs
    path('allergies/', AllergyListCreateAPIView.as_view(), name='allergy-list'),
    path('allergies/<int:pk>/', AllergyDetailAPIView.as_view(), name='allergy-detail'),

    # Medication URLs
    path('medications/', MedicationListCreateAPIView.as_view(), name='medication-list'),
    path('medications/<int:pk>/', MedicationDetailAPIView.as_view(), name='medication-detail'),

    # Vitals URLs
    path('vitals/', VitalsListCreateAPIView.as_view(), name='vitals-list'),
    path('vitals/<int:pk>/', VitalsDetailAPIView.as_view(), name='vitals-detail'),
]

