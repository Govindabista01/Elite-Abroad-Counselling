from rest_framework import viewsets
from .models import Inquiry
from .serializers import InquirySerializer
from django.core.mail import send_mail
from django.conf import settings

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    authentication_classes = [] # Disable session auth to bypass CSRF for public form
    permission_classes = [] # Allow any submission

    def perform_create(self, serializer):
        inquiry = serializer.save()
        
        # Send email notification in a background thread to prevent timeouts
        import threading
        
        def send_notification():
            subject = f"New Inquiry from {inquiry.name}"
            message = f"You have received a new inquiry.\n\nName: {inquiry.name}\nEmail: {inquiry.email}\nPhone: {inquiry.phone}\nAddress: {inquiry.address}\nDestination: {inquiry.destination}\nStudy Level: {inquiry.study_level}\nTest Type: {inquiry.test_type}\n\nMessage:\n{inquiry.message}"
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.NOTIFICATION_EMAIL],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Error sending inquiry email: {e}")

        threading.Thread(target=send_notification).start()
