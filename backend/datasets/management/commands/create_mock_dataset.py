from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from datasets.models import Dataset

class Command(BaseCommand):
    help = 'Creates a mock dataset for testing'

    def handle(self, *args, **kwargs):
        user = User.objects.first()
        if not user:
            self.stdout.write(self.style.ERROR('No user found. Please create a user first.'))
            return

        dataset = Dataset.objects.create(
            title='Mock Dataset',
            description='This is a mock dataset for testing purposes.',
            owner=user
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created mock dataset: {dataset.title}')) 