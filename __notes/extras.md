## Possible further Routes:

### Potential Refactors:

- Total count --> either put in as another function, or find a way in knex to allow a second count query that's not tied to the groupBy

- Auth0 and passport full login authentication
  https://auth0.com/blog/create-a-simple-and-secure-node-express-app/

- Add in VIEWS ! 'A View, in the context of a Model View Controller (MVC) architecture, is a software class that contains a template and data form and produces a response for the browser. It receives data from the Controller of the MVC and packages it and presents it to the browser for display' https://github.com/expressjs/express/tree/master/examples/mvc/views


- Ignore below leave formatting to front end / find Knex workaround for toLocaleString()
Improve the Date Formatter to a more readable form with .toUTCString or .toLocaleString (also Date and Time similarly)

- Array destructuring?

- Post 201 for new article doesn't have a comment_count ? When is that created?

- What causes there to by x6 console logs above return connection in model fetchAllArticles --> 6 query fields? Is this normal behavior?

### User Profile:

Change your avatar - Patch
Delete profile --> what consequences for data left behind, articles, comments etc? --> Look at set-up between article deletion and CASCADE for the associated comments

## Error Handling

- err.message giving back strings like : 
>insert into "topics" ("description", "slug") values ($1, $2) returning * - value too long for type character varying(35)
- Could this be used entirely or should only second half be taken? 
  - .indexOf(' - '), .slice()
  - Would it be useful to send the err.code instead
  - Or hard code in each option? 

### Topics

Error handling --> using datatypes other than string e.g. slug: {test: true} isn't causing an issue??

