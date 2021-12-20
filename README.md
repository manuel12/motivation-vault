[![api_project](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/u75kao&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/u75kao/runs)

# API Resource

The API Resource is an application that hosts optimistic, inspiring, motivational and educational content.

## Installation - Django

   For installing the Django application clone the repository and run:

     pipenv install

   This will install the virtual environment and all dependencies.
   
   Now start the virtual envrironment shell:
    
     pipenv shell


   Run migrations: 
	
    python manage.py makemigrations resources
    python manage.py migrate

   Create superuser:

    python manage.py createsuperuser
    
   Now you can start server...
   
    python manage.py runserver
   
   ...and visit http://localhost:8000/api/

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

