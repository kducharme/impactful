from rest_framework import viewsets
from programs.serializers import ProjectTypeSerializer
from programs.models import ProjectType


class ProjectTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ProjectTypes to be viewed or edited.
    """
    queryset = ProjectType.objects.all()
    serializer_class = ProjectTypeSerializer