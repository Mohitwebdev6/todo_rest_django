from datetime import date
from .models import Todo
from .serializers import TodoSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
@api_view(['GET','POST'])
def todo(request):
    if request.method== "POST":
        serializers=TodoSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.data,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        todos=Todo.objects.all().order_by("-created_at")
        serializers= TodoSerializers(todos,many=True)
        return Response(serializers.data,status=status.HTTP_200_OK)
        
    return Response({"msg":"This request is not allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
    

@api_view(['GET','DELETE','PATCH'])
def todo_methods(request,id):
    todo=Todo.objects.filter(id=id).exists()
    if todo:
        todo=Todo.objects.get(id=id)
    else:
        return Response({"msg":"Data doesnot exists"},status=status.HTTP_404_NOT_FOUND)
    
    if request.method== "DELETE":    
        todo.delete()
        return Response({"msg":"Deleted Sucessfully"},status=status.HTTP_200_OK)

    elif request.method == "PATCH":
        serializers=TodoSerializers(todo,data=request.data,partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response({"msg":"Data Updated","updated data":serializers.data},status=status.HTTP_202_ACCEPTED)
        return Response(serializers.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
    
    elif request.method == "GET":
        serializers=TodoSerializers(todo)
        return Response(serializers.data,status=status.HTTP_200_OK)
    
    return Response({"msg":"This request is not allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)


