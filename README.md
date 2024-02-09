# Spotted - Social Media Application

## What's Spotted app?

Spotted is a social media application tailored for local communities. It is an online hub for staying updated on everything happening in your neighbourhood.
Share what’s happening in your community, from the latest accidents to exciting developments, traffic updates to lost items.

## Deployed Application

The following screencast demonstrates the app's functionality.

https://github.com/Vickysug/project-1/assets/16445610/9550a195-d73f-4e39-9fa0-d0f69f1895ef

The deployed application is available at [https://jbraddockm.github.io/spotted-app/](https://jbraddockm.github.io/spotted-app/).

## Table of Contents
* [Tech Stack](#tech-stack)
* [APIs](#apis)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Limitations](#limitations)
* [Credit](#credit)
* [License](#license)

## Tech Stack
The app uses the following frameworks and libraries:
* [jQuery](https://jquery.com/) - v3.7.1
* [Tailwind CSS](https://tailwindcss.com/) - v3.4.1
* [Flowbite](https://flowbite.com/) - v2.2.1
* [Quill.js](https://quilljs.com/) - v1.3.6
* [Dayjs](https://day.js.org/) - v1.11.10

## APIs
The app uses the following APIs
* [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)
* [Open Street Map - Nominatim](https://nominatim.openstreetmap.org/ui/about.html)
* [Pravatar](https://pravatar.cc/)

## Installation
The application does not require any installation or build system. Please visit [https://jbraddockm.github.io/spotted-app/](https://jbraddockm.github.io/spotted-app/) to test the app. See the Usage section below for further details.
## Usage
* The app utilises an initialisation process to mimic a single-page application. It retrieves data from corresponding APIs, creates objects, persists them to localStorage, and finally renders the UI.
* Viewing posts is open to the public and does not require authentication. However, to compose a new post, the app requires authentication. Please use the following credentials to log in OR if you want to test with different users, you can get credential details from localStorage.
  * **Login Details** 
    * `Email address`: demo@demo.com `Password`: 12345
* The app supports new user registration with each input being checked and validated. After the form is validated and user is saved, the app will authenticate the newly created user automatically.
* Getting current location information requires user permission. Follow the browser prompt to allow location access.
## Features
* The app implements user authentication, generates an authentication token, and saves it to sessionStorage
* The app implements user registration and supports form validation
* The app supports reverse GeoCoding with Open Street Map API. It gets the user's current coordinates and resolves it to an address. 
* The app supports Quill.js text editor; therefore, it supports rich text format.
* The app uses Modal and Dropdown objects from the Flowbite library to control modals and the user dropdown menu programmatically
* The app has internal APIs/Methods to work with localStorage, implement authentication, and manage global variables. It borrows the naming convention from Spring Framework.
  * **[Persistence Context](assets/js/persistence-context.js)**: 
    * This API uses Map as the data structure
    * This API allows persisting data to and retrieving from localStorage.
    * This API generates sequential IDs while creating objects.
    * Persistence context is extended by three objects:
      * **UserRepository**: The object provides methods to work with the User object:
        * `saveUser()`: Saves the given user object. `Returns` user. 
        * `createUser()`: Assigns a sequential ID to the user object and saves it to localStorage. `Returns` user.
        * `findAll()`: Returns an array of all users.
        * `findUserById()`: Finds and returns the user with the given id. Returns `false` if the user does not exist.
        * `findUserByUsername()`: Finds and returns the user with the given username. Returns `false` if the user does not exist.
        * `findUserByEmail()`: Finds and returns the user with the given email address. Returns `false` if the user does not exist.
        * `getAllPostsByUserId()` Returns all posts by the user with the given id. Return `false` if no post is available.
      * **PostRepository**: The object provides methods to work with the Post object:
        * `savePost()`: Saves the given post object. `Returns` post.
        * `createPost()`: Assigns a sequential id to the post object and saves it to localStorage. `Returns` post.
        * `findAll()`: Returns an array of all posts.
        * `findPostById()`: Finds and returns the post with the given id. Returns `false` if the post does not exist.
      * **LocationRepository**: The object provides methods to work with the Location object:
        * `saveLocation()`: Saves the given location object. `Returns` location.
        * `findAll()`: Returns an array of all locations.
        * `findLocationById()`: Finds and returns the location with the given id. Returns `false` if location does not exist.
        * `getLocationByPostId`: Finds the location for the given id. Returns `false` if location does not exist.
  * **[Security Context](assets/js/security-context.js)**
    * This API implements user authentication, generates a token, and saves it to sessionStorage. 
    * The app supports user log-out, which clears the authentication token from sessionStorage. 
    * If localStorage is cleared while the authentication token remains in sessionStorage, the app clears sessionStorage and requires re-initialisation.
    * This API has the following methods:
      * `getAuthenticationToken()`: Retrieves authentication token from sessionStorage. Returns `false` if `jwt-token` key does not exist in sessionStorage.
      * `isAuthenticated()`: Checks if a given user is authenticated. Returns `true` or `false`.
      * `isCredentialsCorrect()`: Checks if a given user's credentials are correct. Returns `true` or `false`.
      * `authenticateUser()`: Authenticates user, generates a token, and saves it to sessionStorage. Returns `authToken`.
      * `logout()`: Logs out the authenticated user and clears sessionStorage. Returns `false`, if logout fails.
  * **[Application Context](assets/js/application-context.js)**
    * This API contains global variables to keep them organised and manageable. 
    * This API has the following variables:
      * `resolvedLocation`: Location variable that stores the user's current location
      * `formValidationSuccess`: CSS styling for valid form inputs
      * `formValidationError`: CSS styling for invalid form inputs
      * `formInputDefaultStyle`: Default CSS styling for form inputs
## Limitations
* The app currently does not support multi-user authentication
* The app currently does not support delete or edit operations
* The app currently does not support searching locations by name, which is also known as forward GeoCoding
* The app currently only searches through available posts in the DOM. It does not search in localStorage
## Credit
## License
Please refer to the LICENSE in the repo.
