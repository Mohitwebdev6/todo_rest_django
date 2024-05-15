from django.urls import path
from . import views
urlpatterns = [
    path("todo_list/",views.todo_list,name="todo_list"),
    path("add_todo/",views.add_todo,name="add_todo"),
    path("delete_todo/<id>/",views.delete_todo,name="delete_todo"),
    path("update_todo/<id>/",views.update_todo,name="update_todo"),

]
