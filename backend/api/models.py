from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    def __str__(self):
        return self.username
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name=models.CharField(max_length=100)
    bio=models.CharField(max_length=300)
    image=models.ImageField(default="default.jpg", upload_to="user_images")
    verified = models.BooleanField(default=False)
    def __str__(self):
        return self.full_name
    
def create_user_profile(sender, instance, created,**kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile,sender=User)
post_save.connect(save_user_profile, sender=User)

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver")

    message= models.CharField(max_length=100)
    is_read=models.BooleanField(default=False)
    date= models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering=['date']
        verbose_name_plural="Message"
    
    def __str__(self):
        return f"{self.sender} - {self.receiver}"
    
    @property
    def sender_profile(self):
        sender_profile= Profile.objects.get(user=self.sender)

