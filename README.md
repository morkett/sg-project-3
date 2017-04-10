# Sparta Global Webdev4 Project 3: Angular SPA

## Synopsis
This App allows users to create an account and browse through movie collections ranging from those in theatre to movies by category, and gives users the ability to look up similar movies.  

This project is a MEAN app that uses a rMVC approach and utilises HTTP requests. It utilises  Node/Express server-side, and AngularJS client-side and an external API to create a single page application.


## Motivation

This project was undertaken to solidify understand of HTTP methods and how this works server side and client side. It was also built in an attempt to understand how API's work and how they can be used in an App.

## Installation

To use this app:
* Clone the [repository](https://github.com/morkett/sg-project-3.git)
* In the command line `npm install` (this will install all the necessary dependencies stored in the `package.json` file)
* In order to spin up the server the following command must be inputted to the terminal `npm run nodemon`.

## Functions
* This project uses [`Firebase`](https://firebase.google.com/) to create new users, signing in and signing out.
* The user can search through a pre-assembled list of movies populated by [The Movie Data Base](https://www.themoviedb.org/documentation/api) API data and sorted into category by genre, popularity and movies in cinema.
* The user also has the ability to search the database for a particular movie.
* The user can also click on a movie for further information and have similar movies suggested to them.


##Technologies Used
* The server is running with [`node.js`](https://nodejs.org/en/)
* The client side aspect of the site is built using [`AngularJs`](https://angularjs.org/) to control the states via ui-routing and the logic to create a functioning single page app.
* The app is built with HTML and CSS
* Animations are controlled via CSS
* Javascript

## Author

[David Corkett](https://github.com/morkett)
