# Generated by Django 4.2.3 on 2023-07-17 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_users_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='user_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='user_password',
            new_name='password',
        ),
    ]