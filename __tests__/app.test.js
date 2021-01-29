process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

describe('PATH: /api', () => {
	beforeEach(() => {
		return connection.seed.run();
	});
	afterAll(() => {
		return connection.destroy();
	});

	describe('PATH: api/topics', () => {
		test('GET 200: responds with an array of all topics, each topic has the correct keys', () => {
			return request(app)
				.get('/api/topics')
				.expect(200)
				.then((res) => {
					const { topics } = res.body;
					expect(topics).toEqual(expect.any(Array));
					expect(topics[0]).toHaveProperty('slug');
					expect(topics[0]).toHaveProperty('description');
				});
		});
		test('POST 201: successfully adds a new topic and returns the post details', () => {
			return request(app)
				.post('/api/topics')
				.send({ slug: 'testing', description: 'I am a test' })
				.expect(201)
				.then(({ body: { topic } }) => {
					expect(topic).toEqual({
						slug: 'testing',
						description: 'I am a test',
					});
				});
		});
		// topics closing
	});

	describe('PATH: api/users', () => {
		test('GET 200: responds with an array of all users, and each user object has the correct keys', () => {
			return request(app)
				.get('/api/users')
				.expect(200)
				.then((res) => {
					const { users } = res.body;
					expect(users).toEqual(expect.any(Array));
					expect(users[0]).toHaveProperty('name');
					expect(users[0]).toHaveProperty('username');
					expect(users[0]).toHaveProperty('avatar_url');
				});
		});
		test('POST 201: should add a new user, and return the user details', () => {
			return request(app)
				.post('/api/users')
				.send({
					name: 'Cuba E',
					username: 'CubaTheStaffy',
					avatar_url: 'https://www.instagram.com/p/CKbpvsSABfq/',
				})
				.expect(201)
				.then(({ body: { user } }) => {
					expect(user).toMatchObject({
						name: 'Cuba E',
						username: 'CubaTheStaffy',
						avatar_url: 'https://www.instagram.com/p/CKbpvsSABfq/',
					});
				});
		});
		describe('PATH /:username', () => {
			test('GET 200: responds with an object of the user with the correct keys', () => {
				return request(app)
					.get('/api/users/lurker')
					.expect(200)
					.then((res) => {
						const { user } = res.body;
						expect(user).toEqual(expect.any(Object));
						expect(Object.keys(user)).toEqual(
							expect.arrayContaining(['username', 'avatar_url', 'name'])
						);
						expect(user.username).toBe('lurker');
					});
			});
			// users/:username closing
		});
		// users closing
	});
	describe('PATH: api/articles', () => {
		// all articles
		test('GET 200: returns  an array of all the article objects', () => {
			return request(app)
			  .get('/api/articles')
			  .expect(200)
			  .then(({body: {articles}}) => {
				 expect(articles).toEqual(expect.any(Array));
			  });
		 });
		 test('GET 200 the returned objects have the correct keys', () => {
			return request(app)
			  .get('/api/articles')
			  .expect(200)
			  .then(({body: {articles}}) => {
			expect(Object.keys(articles[0])).toEqual(expect.arrayContaining([ 'author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count']))
		 });
	  });
 
		test('POST 201: responds with the newly posted article', () => {
			return request(app)
				.post('/api/articles')
				.send({
					title: 'Star Wars',
					body: 'A long time ago in a galaxy far far away',
					topic: 'paper',
					username: 'icellusedkars',
				})
				.expect(201)
				.then((res) => {
					const { article } = res.body;
					expect(article).toEqual(expect.any(Object));
					expect(Object.keys(article)).toEqual(
						expect.arrayContaining([
							'article_id',
							'title',
							'body',
							'votes',
							'topic',
							'author',
							'created_at',
						])
					);
				});
		});

		describe('PATH: /:article_id', () => {
			// individual articles
			test('GET 200: responds with an object of the reqested article with the correct keys', () => {
				return request(app)
					.get('/api/articles/1')
					.expect(200)
					.then((res) => {
						const { article } = res.body;
						expect(article).toEqual(expect.any(Object));
						expect(Object.keys(article)).toEqual(
							expect.arrayContaining([
								'author',
								'title',
								'article_id',
								'body',
								'topic',
								'created_at',
								'votes',
								'comment_count',
							])
						);
					});
			});

			test('PATCH 202: and increases the vote count by the passed amount', () => {
				const increaseBy = { inc_votes: 5 };
				return request(app)
					.patch('/api/articles/1')
					.send(increaseBy)
					.expect(202)
					.then((res) => {
						const {
							article: { votes },
						} = res.body;

						expect(votes).toBe(105);
					});
			});
			test('PATCH 202: and decreases the vote count by the passed amount', () => {
				const increaseBy = { inc_votes: -5 };
				return request(app)
					.patch('/api/articles/1')
					.send(increaseBy)
					.expect(202)
					.then((res) => {
						const {
							article: { votes },
						} = res.body;

						expect(votes).toBe(95);
					});
			});

			test('DELETE 204: deletes the article, only returning 204 status', () => {
				return request(app)
					.delete('/api/articles/1')
					.expect(204)
					.then(({ body }) => {
						expect(Object.entries(body).length).toBe(0);
					});
			});
			test('DELETE 204: deletes the article specified in the path', () => {
				return request(app)
					.delete('/api/articles/1')
					.expect(204)
					.then(() => {
						return connection
							.from('articles')
							.where('article_id', '=', '1')
							.first();
					})
					.then((article) => {
						expect(article).toBeUndefined();
					});
			});
			test('DELETE 204: deletes all comments on the deleted article', () => {
				return request(app)
					.delete('/api/articles/1')
					.expect(204)
					.then(() => {
						return connection.from('comments').where('article_id', '=', '1');
					})
					.then((commentArray) => {
						expect(commentArray.length).toBe(0);
					});
			});
		});

		describe('PATH: /:article_id/comments', () => {
			// comments on individual articles
			test('GET 200: responds with an array of comments when an article has comments', () => {
				return request(app)
					.get('/api/articles/1/comments')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;
						expect(comments).toEqual(expect.any(Array));
						expect(comments.length).toBeGreaterThan(0);
					});
			});
			test('GET 200: responds with an empty array when an article has comments', () => {
				return request(app)
					.get('/api/articles/2/comments')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;
						expect(comments).toEqual(expect.any(Array));
						expect(comments.length).toBe(0);
					});
			});
			test('GET 200: each comment returned should have the correct keys', () => {
				return request(app)
					.get('/api/articles/1/comments')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;
						expect(Object.keys(comments[0])).toEqual(
							expect.arrayContaining([
								'comment_id',
								'votes',
								'created_at',
								'author',
								'body',
							])
						);
					});
			});

			test('GET 200: accepts a sort_by query that defaults to the "created_at" column', () => {
				return request(app)
					.get('/api/articles/1/comments/')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;
						expect(comments).toBeSortedBy('created_at');
					});
			});

			test('GET 200: uses provided sort_by query and not the default', () => {
				return request(app)
					.get('/api/articles/1/comments?sort_by=votes')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;
						expect(comments).toBeSortedBy('votes');
					});
			});

			test('GET 200: orders the comments based on an order query', () => {
				return request(app)
					.get('/api/articles/1/comments?order=desc')
					.expect(200)
					.then((res) => {
						const { comments } = res.body;

						expect(comments).toBeSortedBy('created_at', {
							descending: true,
							// coerce: true,
						});
					});
			});

			test('POST 201: responds with the newly posted comment', () => {
				return request(app)
					.post('/api/articles/5/comments')
					.send({
						username: 'icellusedkars',
						body:
							'Reminder! - Remember that as username is an FK, and we are in test data, you need to use a user that already exists to avoid this: insert or update on table "comments" violates foreign key constraint "comments_author_foreign"',
					})
					.expect(201)
					.then(({ body: { comment } }) => {
						expect(comment).toEqual(expect.any(Object));
						expect(Object.keys(comment)).toEqual(
							expect.arrayContaining([
								'author',
								'comment_id',
								'article_id',
								'body',
								'votes',
							])
						);
					});
			});
		});
		//articles closing
	});
	describe('PATH: api/comments', () => {
		describe('PATH: /comments/:commentid', () => {
			test('PATCH 202: increases the vote count by the passed amount, and returns the updated comment', () => {
				const increaseBy = { inc_votes: 5 };
				return request(app)
					.patch('/api/comments/1')
					.send(increaseBy)
					.expect(202)
					.then(
						({
							body: {
								comment: { votes },
							},
						}) => {
							expect(votes).toBe(21);
						}
					);
			});
			test('PATCH 202: decreases the vote count by the passed amount, and returns the updated comment', () => {
				const decreaseBy = { inc_votes: -5 };
				return request(app)
					.patch('/api/comments/1')
					.send(decreaseBy)
					.expect(202)
					.then(
						({
							body: {
								comment: { votes },
							},
						}) => {
							expect(votes).toBe(11);
						}
					);
			});

			test('DELETE 204: deletes the comment, only returning 204 status', () => {
				return request(app)
					.delete('/api/comments/1')
					.expect(204)
					.then(({ body }) => {
						expect(Object.entries(body).length).toBe(0);
					});
			});
			test('DELETE 204: deletes the comment specified in the path', () => {
				return request(app)
					.delete('/api/comments/1')
					.expect(204)
					.then(() => {
						return connection
							.from('comments')
							.where('comment_id', '=', '1')
							.first();
					})
					.then((comment) => {
						expect(comment).toBeUndefined();
					});
			});
		});
		//comments closing
	});
	// api closing
});
