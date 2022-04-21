[![django-api-reac](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/3i7tdw&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/3i7tdw/runs)

# API Resource

The API Resource is an application that hosts optimistic, inspiring, motivational and educational content.

## Usage

### Adding Resources
You can add a new resource by clicking on the "+Add" link on the navigation bar.

Then you can select the resource type from the dropdown. 

The 4 available types are: Book, Podcast, Podcast Episode and Motivational Speech. 

Once you have selected the resource type the form will be displayed, and you can fill it in with the resource's data.

**Note:** 
*You cannot submit the form until all the required fields are filled. If you click submit without such fields or pass invalid data to those fields the form will display corresponding error labels.*

Once the form is submitted your resource will appear first on the home page resource list and on it's own category's list (If the resource is a podcast it will appear first on the list you get after navigating to "Podcasts" on the navigation bar).

(Action #1 GIF)

### Visiting a Resource's Detail Page.
You can also check more information, leave a rating or a comment on a specific resource by visiting said resource's detail page. 

Just click on the resource's image or text on the home page list or on any of the category lists.

The detail page is where all of the resource's information is displayed, as well as where it's poster image(for books or podcasts) or youtube video(for podcast episodes or motivational speeches) will be displayed.

The resource's description will be displayed here in full as well as it's "value section" which is basically a list of points on the benefits of consuming said resource.

(Action #2 GIF)

### Leave a Rating.
You can leave a rating on a resource by clicking the "+" next to the ratings counter (right below the resource's author) on the detail page.

Here you can click on the number of stars you think the resource deserves and it will inmediatly save that rating.

**Note:** *A user can only leave 1 rating per resource.*

(Action #3 GIF)

### Leave a Comment.
You can leave a comment by clicking  on the "Write a comment..." input field on the detail page. Once you've written a comment the "Comment" button will become active and clicking it will submit the comment. To abort leaving the comment click "Cancel".

Unlike ratings a user can write as many comments per resource as they like.

(Action #4 GIF)

<br />

### Credentials ###   
**TODO!**

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

