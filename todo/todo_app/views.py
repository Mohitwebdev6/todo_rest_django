from .models import Todo
from .serializers import TodoSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
@api_view(['GET'])
def todo_list(request):
 
    todos=Todo.objects.all()
    serializers= TodoSerializers(todos,many=True)

    return Response(serializers.data,status=status.HTTP_200_OK)
    
@api_view(['POST'])
def add_todo(request):
    if request.method== "POST":
        serializers=TodoSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.data,status=status.HTTP_400_BAD_REQUEST)
    return Response({"req":"cannot provide get request"},status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
def delete_todo(request,id):
    if request.method== "DELETE":
        todo=Todo.objects.filter(id=id).exists()
        if todo:
            todo=Todo.objects.get(id=id)
        else:
            return Response({"msg":"Data doesnot exists"},status=status.HTTP_404_NOT_FOUND)
        todo.delete()
        return Response({"msg":"Deleted Sucessfully"},status=status.HTTP_200_OK)

    return Response({"req":"request not allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['PATCH'])
def update_todo(request,id):
    todo=Todo.objects.filter(id=id).exists()
    if todo:
        todo=Todo.objects.get(id=id)
    else:
        return Response({"msg":"Data doesnot exists"},status=status.HTTP_404_NOT_FOUND)
    if request.method=="PATCH" :
        serializers=TodoSerializers(todo,data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"msg":"Data Updated"},status=status.HTTP_202_ACCEPTED)
        return Response(serializers.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
    return Response({"req":"request not allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)


