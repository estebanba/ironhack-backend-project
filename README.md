# The PlantApp

## Description

The PlantApp is an App that helps you take care of your personal garden. You can create a user and have your own collection of plants. In the app's database there will be a wide range of plant type. With this general information you can customize your own plants and give them name, location and maybe a comment. The app reminds you the last time you watered your plants and recommends the next one using the plant type information from the database.

## User

- **homepage** - I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - I want to sign up on the webpage so that I can see all the plants available and my list of plants
- **login** - I want to be able to log in on the webpage so that I can get back to my account
- **logout** - I want to be able to log out from the webpage so that I can make sure no one will access my account
- **browse plant list** - I want to be able to see all the plants available and add the one I want to my collection
- **CRUD user plants** - I want to be able to create/read/update/delete all the plants in my collection


## Backlog

- There's user roles. Admin users have access to different views and different features
- Order plants by next watering date

## ROUTES:
**Index**
- GET / 
    - renders the homepage 

**Auth**
- GET /auth/signup
    - redirects to /user-profile if user logged in
    - renders the signup form 
- POST /auth/signup
    - redirects to /user-profile if user logged is in
    - creates a new user in the database
- GET /auth/login
    - redirects to /user-profile if user logged in
    - renders the login form 
- POST /auth/login
    - redirects to /userPlant if user logged in
    - creates a new user session 
- POST /auth/logout 
    - redirects to /homepage 
    - stops/destroys current user session

**Plant**
- GET /plant
    - redirects to /homepage if an error occurs
    - renders the plant type list
- GET /plant/create
    - redirects to /plant if user not logged in or user is not admin
    - renders a form to create a new plant type
- POST /plant/create
    - creates a new plant type in the database
    - renders the plant list with the new addition
- GET /plant/:id
    - redirects to /plant if user not logged in
    - renders the details of a single plant

**User Plant**
- GET /userPlant
    - redirects to /user-profile if an error occurs
    - renders a list of all user plants
- GET /userPlant/create
    - redirects to /user-profile if an error occurs
    - renders a form to create a new user plant 
- POST /userPlant/create
    - if the Last Watering date introduced is in the future (incongruency) renders the form again with an error message
    - if the Last Watering date introduced is too far in the past renders the form again with an error message
    - creates a new user plant in the user collection
    - renders the user plant collection from the user
- GET /userPlant/:id/edit
    - redirects to /user-profile if an error happens
    - renders edit form for one of your plants with the current info
- POST /userPlant/:id/edit
    - redirects to /userPlant if an error happens
    - finds and updates the user plant with provided info
    - redirects to /userPlant with the updated list of user plants
- POST /userPlant/:id/delete
    - redirects to /user-profile if an error happens
    - finds a plant and deletes it 
    - redirects to /userPlant with the updated list of user plants
- GET /userPlant/:id
    - redirects to /user-profile if an error happens
    - renders the plant type details of the user plant passed by parameter
- POST /userPlant/:id/watered
    - redirects to /userPlant if an error happens
    - updates user plant watering information 
    - redirects to /userPlant


## Models
User model
    username : String,
    password : String,
    email : String,
    plants : ObjectId<UserPlant>
    role : String

Plant model
    name: String,
    category: String,
    imageSrc: String,
    description: String,
    light: String,
    wateringWeekly: Number,
    petFriendly: Boolean

UserPlant model
    name: String,
    owner: ObjectId<User>,
    plantType: ObjectId<Plant>,
    lastWatering: String,
    nextWatering: String,
    comments: String

    
## Links

- [Trello Link](https://trello.com/b/ITGWOM0Q/backend-project)
- [Slides Link]()
- [Github repository Link](https://github.com/estebanba/ironhack-backend-project)
