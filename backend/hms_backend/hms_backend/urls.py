"""
URL configuration for djact project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from hms_backend.views import (
    PermissionListAPIView, GroupListAPIView, GroupDetailAPIView,
    AssignPermissionsToGroupAPIView, RemovePermissionsFromGroupAPIView
)


schema_view = get_schema_view(
   openapi.Info(
      title="Django API with react and redux tutorial",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('permissions/', PermissionListAPIView.as_view(), name='permission-list'),
    path('groups/', GroupListAPIView.as_view(), name='group-list'),
    path('groups/<int:pk>/', GroupDetailAPIView.as_view(), name='group-detail'),
    path('groups/<int:group_id>/add_permissions/', AssignPermissionsToGroupAPIView.as_view(), name='assign-permissions'),
    path('groups/<int:group_id>/remove_permissions/', RemovePermissionsFromGroupAPIView.as_view(), name='remove-permissions'),
    path('accounts/', include('djoser.urls')),
    path('accounts/', include('djoser.urls.jwt')),
    path('patients/', include('patients.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
