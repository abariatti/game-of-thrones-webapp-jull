# Game Of Thrones App

This angular webapp allows users to get detailed information on Game of Thrones characters, houses and books. Additionally, there is a login step to get to the resources. 

# Project Structure explained
### pages 
#### auth
- This is the login page. After successful login user is routed to "home" page
#### home 
- This is the home page where the user can find all the resources (characters, houses, books), which can be filtered and searched for. Within this folder you find one folder for each resource that contain the search field and the filters as well. Within each of these folders you also find a separate component to display a detailed page for one specific character / book / house.
### shared
#### components
- These are shared components like header, layout (which is used to differentiate between login page = no header) and home page (including header), and an info-card component that is used for the detailed pages mentioned above
#### helpers
- These are helper functions, mostly to format data in order to use the https://www.anapioficeandfire.com/ API. 
#### pipes
- I added a pipe to sort and filter data. I later decided not to use the sort pipe because it would cause problems with infinite scroll of the data lists. The filter pipe is used for the books component, because there are only a few books available through the API, so I decided to filter everything on the client side.
#### services
- The **auth guard service** checks if user is logged in on every route change
- The **auth service** handles user login and stores logged in status in local storage
- The **cache service** caches API results in memory
- The **http cache interceptor service** intercepts API request and then uses the cache service to cache the results
- The **resouce service** is at the heart of the application. It makes requests to the API and provides the resource components with data

# Important information
- The **login** is only handled on the client-side by hard-coding the password to 123456. After login with this password, the logged in status is stored in local storage so that the site can be refreshed. This simplified procedure was asked in the task assigment.
- The app uses **debouncing** on the search field to limit api requests and optimize performance
- The app uses in memory **caching** to limit api requests and optimize performance
- Each API request is limited to 50 datapoints (**pagination**). If there are more, the number of pages is extracted from the header and saved. The next 50 datapoints can be retrieved when the user scrolls down to the end of the list and clicks on the button "load more data". When the last page is reached, the button is deactivated.
- It was not possible to add an **autocomplete** feature because the api doesn't allow to search for suggestions (e.g. you have to search for "Petyr Baelish" to find the character, "Baelish" or "Petyr Bae" doesn't return anything
- I used Nebular as a **design** theme: https://akveo.github.io/nebular/
- App is **mobile responsive**
- Unfortunately I had not enough time to implement some **tests** :(

# Live version
A live version of the site can be found on https://game-of-thrones-owt.netlify.app/. Just type in any username you want and 123456 as password. Or download the source code and run ng serve.

