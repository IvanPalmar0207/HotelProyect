"""
URL configuration for reactRest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

"""
URL configuration for proyectoRestFull project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from reactRest.views import proyectoModuloApis
from rest_framework.documentation import include_docs_urls
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',proyectoModuloApis,name='paginaPrincipal'),
    path('usuariosAPI/',include('usuariosAPI.urls')),
    path('habitacionesAPI/',include('habitacionesAPI.urls')),
    path('reservasAPI/', include('reservasAPI.urls')),
    path('serviciosAPI/', include('serviciosAPI.urls')),
    path('facturasAPI/', include('facturasAPI.urls')),
    path('documentacion/',include_docs_urls(title='Documentacion de las APis'))
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)