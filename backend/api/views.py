from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer

def user_list(request):
    # get all drinks
    user = User.objects.all()
    # serialize them
    serializer = UserSerializer(user, many=True)
    # return JSON
    JsonResponse(serializer.data, safe=False)