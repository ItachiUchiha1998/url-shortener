# url-shortener
A simple url shortener microservice which shortens a given link uniquely

Prerequisites : Node , npm and MongoDB installed

# before running the app 
   init your mongo in terminal by entering following command
	 ##    use url-short
     ##    db.counters.insert({ _id: 'url_count', seq: 1 })

to run the app

1. Open app in terminal
2. npm install 
3. node server.js

# Libraries Used : 

I have used ExpressJS server as backend and MongoDB as my database to store links
body-parser library has been used to parse the post requests from front-end
mongoose to easily access mongoDB via js

# Working :

When the user submits the url an api request is sent to the server by an ajax call

First it checks if the given url is already shortened or not,
If it is, the corresponding short url is outputted
If not, The url will be converted from base10 to base64 by applying a simple algorithm and hence will be compressed
and stored in database.

An other database is made to keep track of urls 

When the user clicks on the shortened url link,
Another api call occurs which checks the database for the subsequent actual url and redirects to it
In case a user tries to access a url not present in database,the page will be directed to
homepage  of url-shortener app.

