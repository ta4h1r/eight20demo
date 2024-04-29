## Pre-requisites
1. Python v3.11.6 
2. Node.js v20.12.2

## Setup 
1. Clone this repository
2. ```cd``` into ```server``` and run ```pip install -r requirements.txt && python manage.py runserver```
3. ```cd ``` into ```app``` and run ```npm i && npm run start```
4. Navigate to http://localhost:8000/api/register to create a new user
5. Enter the following JSON and click post ```{ "username":"<some-username>", "password": "supersecret", "fav_pokemon": "<my-pokemon>" }``` 
6. Navigate to http://localhost:3000/login and login to the frontend with your credntials.