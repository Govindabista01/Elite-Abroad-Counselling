from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from services.views import ServiceViewSet
from destinations.views import CountryViewSet, UniversityViewSet
from inquiries.views import InquiryViewSet
from blog.views import BlogPostViewSet
from test_prep.views import TestPrepCourseViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'universities', UniversityViewSet)
router.register(r'inquiries', InquiryViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'test-prep', TestPrepCourseViewSet)

admin.site.site_url = 'http://localhost:3000'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
