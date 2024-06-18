
from django.urls import path
from patients import views

urlpatterns = [
    path('profiles/', views.PatientProfileListCreateAPIView.as_view()),
    path('profile/', views.PatientProfileRetrieveUpdateDestroyAPIView.as_view()),
    path('medical-histories/', views.MedicalHistoryListCreateAPIView.as_view()),
    path('medical-histories/', views.MedicalHistoryRetrieveUpdateDestroyAPIView.as_view()),
    path('allergies/', views.AllergyListCreateAPIView.as_view()),
    path('allergies/', views.AllergyRetrieveUpdateDestroyAPIView.as_view()),
    path('medications/', views.MedicationListCreateAPIView.as_view()),
    path('medications/', views.MedicationRetrieveUpdateDestroyAPIView.as_view()),
]