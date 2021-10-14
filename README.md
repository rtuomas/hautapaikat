# Hautapaikat
Website for browsing graves of known finnish people. You can register and log in to the site, which enables you to add new graves and delete old ones. Graves are shown in a map according to coordinates and contain basic information about the deceased. The account is authenticated with JSON Web Token. The search bar allows you to filter search results with either name, category with #-sign and locations with @-sign.

## Technology Stack and APIs
* JS, HTML, CSS
* React (Framework)
* Nodejs, Express, JSON Web Token
* MongoDB Atlas

## Features
* Browse graves of known deceased finnish people
* Locate the graves in a map
* See basic information about the deceased
* Register an account / Login to an account
* Add new graves to the database
* Delete graves from the database

## Rest API
Rest API can be found [here](https://github.com/rtuomas/hautapaikat/blob/main/back/server.js)

### POST 'api/addDead'

This call allows you to add new grave to the database. Takes the information as an object from request. Request is given in the following format (JS):

```
newGrave = {
    firstName,
    lastName,
    birthday,
    died,
    cemetery,
    location: {lat, long},
    category
}
```

### POST 'api/checkLogin'

Authentication method with the JSON Web Token. Takes the token as a request. Returns status 200 when successfull, 401 if not.

### GET 'api/search'

General fetching call for the contents of the database. Can take either cemeteray's, deceased's or boths names as a request. Returns content from the database accordingly.
For example:

```
/api/search?cemetery=kellonummi&name=gösta
/api/search?name=sauli
```

### DELETE 'api/deleteGrave'

Takes the ID of the grave as a request and deletes it from the database. Returns status 200 when successfull.

### PUT 'api/updateCemetary'

Takes the name of the deceased and object of the new data as a request. Updates the database accordingly.

### POST 'api/newUser'

Takes new users data as a request, goes through validation and creates new account to the database with encrypted password. Sets today as a registeration date. Returns status 202 when successfull, and 400 validation fails.

### POST 'api/login'

Takes the account username and password as a request and finds the account from database. If successfull, returns status 202 with the accesstoken. If the data doesn't match with the database, returns status 401.

## Contributors
* Samuel Aitamaa
* Jere Lampola
* Tuomas Rajala
