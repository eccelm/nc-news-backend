# Northcoders News API

## Intro

  This is the main sprint from the Back-End block of the Northcoders bootcamp. The objective was to setup a REST API which provides the interaction with a database of a reddit-style news website. 
 
 It  used by the main Front-End project sprint, which uses React >>> [See the front end code](https://github.com/eccelm/NC-News-React-FrontEnd)

- You can view the hosted version [by clicking here](https://marthas-news-api.herokuapp.com/api)
***
***
## What's involved in this project:
### Express
- Uses Express HTTP utility methods and middleware functions 

### Knex (PostgreSQL Database)
- Knex library was used to set up the db table schemas, populate the db and for the queries to the database.

### Supertest & Jest
- This duo allowed for each function to be built by TDD - including error handling

### Heroku
- For hosting the API 
***
***
## Future Improvements
1. Log-in /authentication feature -> use Auth0 and Passport
2. Add in Views for the hosted API
3. Expanding functionality e.g. ability to update a user profile
4. Expanding the error-handling
5. These are expanded upon in the notes/to_do_improvements.md - this file is a notes-to-self 
