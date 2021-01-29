## Possible further Routes:

### Potential Refactors:

- Can just have a html page in public folder at root level :)
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
--> could .json() work?

{msghere: topics[0] }
// "Wahoo, you've posted a new topic!" --> Optional add in
