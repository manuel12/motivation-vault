[![django-api-reac](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/3i7tdw&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/3i7tdw/runs)

# API Resource

The API Resource is an application that hosts optimistic, inspiring, motivational and educational content.

## Usage

### Adding Resources
You can add a new resource by clicking on the "+Add" link on the navigation bar.

Then you can select the resource type from the dropdown. The 4 available types are:
- Book.
- Podcast.
- Podcast Episode.
- Motivational Speech. 

Once you have select the resource type the form corresponding to that specific type will be displayed and you can fill it in with the resource's data.

**Note:** 
*You will not be able to submit the form until at least all the required fields are filled. If you try to submit the form without such fields or you pass invalid data to those fields the form will display corresponding error labels.*

Once you've submitted the resource form your resource will appear first on the home page resource list and will appear first on it's own category's list (Example: if the resource added is a podcast it will appear first on the list you get after navigating to "Podcasts" on the navigation bar).

(Action #1 GIF)

### Visiting a Resource's Detail Page.
You can also check more information, leave a rating or a comment on a speciific resource by visiting said resource's detail page. 

The detail page is where all of a resource's information is displayed, as well as where it's poster image(in case it is a book or podcast) or youtube video(in case it is a podcast episode or motivational speech) will be displayed.

The resource's description will be displayed here in full as well as it's "value section" which is basically a list of points of which are the benefits of consuming said resource.

(Action #2 GIF)

### Leave a Rating.
You can leave a rating on a resource by navigating to said resource's detail page and clicking the "+" next to the ratings counter (right below the resource's author).

Here you can click on the number of stars you think the resource deserves and it will inmediatly save that rating.

**Note:** *A user can only leave 1 rating per resource.*

(Action #3 GIF)

### Leave a Comment.
You can leave a comment on a resource by navigating to said resource's detail page and clicking  on the "Write a comment..." input field. Once you've written a comment the "Comment" button will become active and clicking it will submit the comment. To abort leaving the comment click "Cancel".

Unlike ratings a user can write as many comments per resource as they like.

(Action #4 GIF)

<br />

### Credentials ###   
username: testuser1  
password: testpass1

You can check the app (please wait a bit for a free dyno to start) [here](https://expense-tracker16.herokuapp.com/).

<br />

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


## Running tests

### Unit tests

    python manage.py test

### E2E tests
For running the tests run:

    npm run test
For running the tests on headless mode run:

    npm run test:headless
For opening cypress client run:

    npm run test:open
    
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

