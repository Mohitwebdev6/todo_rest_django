from django.urls import path
from . import views
urlpatterns = [
    path("todo/",views.todo,name="todo"),
    path("todo/<id>/",views.todo_methods,name="todo_methods"),
]
