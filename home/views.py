from django.contrib import messages
from django.shortcuts import redirect, render
from home.forms import CreateUserForm, LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


# Create your views here.
def home(request):
    return render(request,'home.html')

def user_loggedin(request):
    if request.user.is_authenticated:
        print("11")
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user=authenticate(request,username=username,password=password)
        print("33",user,username,password)
        if user:
            print("44")
            login(request, user)
            print("logged in!!-----------------------")
            return redirect('home')
        else:
            messages.info(request,'Invalid Login!!')
    context={'form':LoginForm()}
    return render(request,'login.html',context)

def signup(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        form=CreateUserForm()
        if request.method=='POST':
            form=CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user=form.cleaned_data.get('username')
                messages.success(request,"Account Created Successfull for ",user)
                return redirect('user_loggedin')
        context={
            'form':form
        }
    return render(request,'signup.html',context)

def loggedout(request):
    logout(request)
    return redirect('home')