## Possible further Routes:

Potential Refactors:
Array destructuring?
Can /Should article/comments move into comments model/controller?
##User Profile:
Create new User
Change your avatar - Patch
Delete profile --> what consequences for data left behind, articles, comments etc?

##Topics
How best to send a message along with the body??
{msghere: topics[0] }
// "Wahoo, you've posted a new topic!" --> Optional add in

GET /api/topics

> > > Time to go solo! <<<
> > > TO DO :

DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles
POST /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api

DELETE /api/articles/:article_id

POST /api/users
