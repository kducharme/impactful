from rest_framework import serializers
from programs.models import ProjectType


class ProjectTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProjectType
        fields = '__all__'