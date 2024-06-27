# views to handle Groups and permissions


from django.contrib.auth.models import Permission, Group
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['id', 'name', 'codename']

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']

class PermissionListAPIView(generics.ListAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated]

class GroupListAPIView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

class GroupDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

class AssignPermissionsToGroupAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id):
        try:
            group = Group.objects.get(pk=group_id)
            permission_ids = request.data.get('permissions', [])
            permissions = Permission.objects.filter(id__in=permission_ids)
            group.permissions.add(*permissions)
            return Response({'status': 'permissions added'}, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)

class RemovePermissionsFromGroupAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id):
        try:
            group = Group.objects.get(pk=group_id)
            permission_ids = request.data.get('permissions', [])
            permissions = Permission.objects.filter(id__in=permission_ids)
            group.permissions.remove(*permissions)
            return Response({'status': 'permissions removed'}, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
