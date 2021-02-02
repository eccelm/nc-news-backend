> ### Hello
>Just to say, this file is a notes-to-self written as I went along for when I revisit the project, and as such may involve the odd typo / incoherent sentence 

### Potential Refactors:

- Total count of Articles (GET) --> either put in as another function, or find a way in knex to allow a second count query that's not tied to the groupBy and can ignore the limit and offset

- Auth0 and passport full login authentication
  https://auth0.com/blog/create-a-simple-and-secure-node-express-app/

- Add in VIEWS ! 'A View, in the context of a Model View Controller (MVC) architecture, is a software class that contains a template and data form and produces a response for the browser. It receives data from the Controller of the MVC and packages it and presents it to the browser for display' https://github.com/expressjs/express/tree/master/examples/mvc/views


- Ignore below leave formatting to front end / find Knex workaround for toLocaleString()
Improve the Date Formatter to a more readable form with .toUTCString or .toLocaleString (also Date and Time similarly)

### Error Handling

- Posting wrong data type e.g. can send a new comment with body as an array, and it gets converted to a string --> how to stop this? 

```js
  console.log
    {
      comment_id: 19,
      author: 'lurker',
      article_id: 5,
      votes: 0,
      body: '{"true","false","1000"}',
      created_at: 2021-02-02T15:28:48.343Z
    } <<<<< should have array

      at controllers/comments.js:27:12
          at runMicrotasks (<anonymous>)
```
   - improve error handling concerning order, page, and getArticles author and topic - currently no distinction between searching by non-existent and accurate but with no results.

   - If an incorrect order is given, it defaults to the generic desc order anyway --> but user could presume their query has worked --> just send a message and keep - or send down a 400 Bad Request route?

  - is there a need to remerge errors.test file with app.test e.g. in crossover cases POST 200 even if extra keys are present --> does this fall under error handling but with a successful 201 req code ?
  
  ##  Questions:
- Should 405 go on all parametric endpoints too like /:articleid ?

- Array destructuring? e.g. instead of  articles[0]

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

405 will not work on /comments route - why ?
### Topics

Error handling --> using datatypes other than string e.g. slug: {test: true} isn't causing an issue??

