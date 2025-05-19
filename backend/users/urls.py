from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ProfileView, UpdateProfileView, ChangePasswordView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('update/', UpdateProfileView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
] 