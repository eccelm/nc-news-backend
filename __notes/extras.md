## Possible further Routes:

### Potential Refactors:

- Total count --> either put in as another function, or find a way in knex to allow a second count query that's not tied to the groupBy

- Auth0 and passport full login authentication
  https://auth0.com/blog/create-a-simple-and-secure-node-express-app/

- Add in VIEWS ! 'A View, in the context of a Model View Controller (MVC) architecture, is a software class that contains a template and data form and produces a response for the browser. It receives data from the Controller of the MVC and packages it and presents it to the browser for display' https://github.com/expressjs/express/tree/master/examples/mvc/views

- Does a valid search with no results come under error handling ? should it 400 ?? maybe 417 Expectations not met?
  418 I'm a teapot?

- Improve the Date Formatter to a more readable form with .toUTCString or .toLocaleString (also Date and Time similarly)

- Array destructuring?

- Post 201 for new article doesn't have a comment_count ? When is that created?

- What causes there to by x6 console logs above return connection in model fetchAllArticles --> 6 query fields? Is this normal behavior?

### User Profile:

Change your avatar - Patch
Delete profile --> what consequences for data left behind, articles, comments etc? --> Look at set-up between article deletion and CASCADE for the associated comments

### Topics

How best to send a message along with the body??
--> could .json() work alongside send - check Express docs?

{msghere: topics[0] }
// "Wahoo, you've posted a new topic!" --> Optional add in - Or easier on front end to add message and style the data?
