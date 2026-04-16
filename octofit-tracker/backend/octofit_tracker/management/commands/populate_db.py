from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Conexión directa a MongoDB para índices y limpieza
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Crear índice único en email
        db.users.create_index([('email', 1)], unique=True)

        # Equipos
        teams = [
            {'name': 'Marvel', 'description': 'Equipo Marvel'},
            {'name': 'DC', 'description': 'Equipo DC'},
        ]
        db.teams.insert_many(teams)

        # Usuarios
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
        ]
        db.users.insert_many(users)

        # Actividades
        activities = [
            {'user': 'spiderman@marvel.com', 'activity': 'Correr', 'duration': 30},
            {'user': 'ironman@marvel.com', 'activity': 'Ciclismo', 'duration': 45},
            {'user': 'batman@dc.com', 'activity': 'Natación', 'duration': 60},
            {'user': 'wonderwoman@dc.com', 'activity': 'Yoga', 'duration': 50},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'user': 'spiderman@marvel.com', 'points': 100},
            {'user': 'ironman@marvel.com', 'points': 90},
            {'user': 'batman@dc.com', 'points': 95},
            {'user': 'wonderwoman@dc.com', 'points': 98},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'user': 'spiderman@marvel.com', 'workout': 'Push-ups', 'reps': 50},
            {'user': 'ironman@marvel.com', 'workout': 'Sit-ups', 'reps': 40},
            {'user': 'batman@dc.com', 'workout': 'Pull-ups', 'reps': 30},
            {'user': 'wonderwoman@dc.com', 'workout': 'Squats', 'reps': 60},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db inicializada y poblada con datos de prueba'))
