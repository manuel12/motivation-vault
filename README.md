
# API Resource

The API Resource is an application that hosts optimistic, inspiring, motivational and educational content.

## Installation - Django

   For installing the Django application run:

     python -m pip install -r requirements.txt --upgrade pip

   For installing the Python virtual environment  run:

     pipenv install

   Run migrations: 
	
    python manage.py makemigrations resources
    python manage.py migrate

   Create superuser:

    python manage.py createsuperuser

## Installation - React
For installing the React application go to the front-end folder and run:

    npm install
    
  And after install is finished run:

    npm start
    
## Uses

 - Django.
 - DRF
 - React.
 - Cypress.

## Features
- Token authentication.
- Form validation.
- Ratings.
- Comments.
- End-to-end tests.

