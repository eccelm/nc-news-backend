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

	describe('Topics', () => {
		describe('api/topics', () => {
			test('405 status when an invalid method is attempted', () => {
				const invalidMethods = ['patch', 'delete'];
				const methodPromises = invalidMethods.map((method) => {
					return request(app)
						[method]('/api/topics')
						.expect(405)
						.then(({ body: { msg } }) => {
							expect(msg).toBe('method not allowed');
						});
				});
				return Promise.all(methodPromises);
			});

			test('POST 400: returns a  "Bad Request" error message when missing required fields', () => {
				return request(app)
					.post('/api/topics')
					.send({ description: 'I am missing the slug catergory' })
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});

			test('POST 400: returns "Bad Request" when the slug exceeds set limit', () => {
				'';
				return request(app)
					.post('/api/topics')
					.send({
						slug: 'Hello I am too long for the slug character limit',
						description: 'a slug that is too long',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
		});
	});
	describe('Users', () => {
		describe('PATH: api/users', () => {
			test('405 status when an invalid method is attempted', () => {
				const invalidMethods = ['patch', 'delete'];
				const methodPromises = invalidMethods.map((method) => {
					return request(app)
						[method]('/api/users')
						.expect(405)
						.then(({ body: { msg } }) => {
							expect(msg).toBe('method not allowed');
						});
				});
				return Promise.all(methodPromises);
			});

			test('POST 400: returns a  "Bad Request" error message when missing required fields', () => {
				return request(app)
					.post('/api/users')
					.send({
						name: 'I am missing the username field',
						avatar_url: 'https://www.instagram.com/p/CKbpvsSABfq/',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('POST 400: returns an error message when the username exceeds set limit of 20', () => {
				'';
				return request(app)
					.post('/api/users')
					.send({
						username: 'I am too long to be a username',
						name: 'I am a test',
						avatar_url: 'https://www.instagram.com/p/CKbpvsSABfq/',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('POST 400: returns an error message when the username already exists in the database', () => {
				return request(app)
					.post('/api/users')
					.send({
						username: 'butter_bridge',
						name: 'I am a test',
						avatar_url: 'https://www.instagram.com/p/CKbpvsSABfq/',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			// BELOW 400 ON PATHS
		});
		describe('PATH /:username', () => {
			test('405 status when an invalid method is attempted', () => {
				const invalidMethods = ['post', 'patch', 'delete'];
				const methodPromises = invalidMethods.map((method) => {
					return request(app)
						[method]('/api/users/lurker')
						.expect(405)
						.then(({ body: { msg } }) => {
							expect(msg).toBe('method not allowed');
						});
				});
				return Promise.all(methodPromises);
			});
			test('GET 404:returns a custom error message for a well-formed endpoint that does not exist', () => {
				return request(app)
					.get('/api/users/nonexistentuser')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe(
							'No user was found for the username: nonexistentuser'
						);
					});
			});
			// users/:username closing
		});
	});
	describe('Articles', () => {
		describe('api/articles', () => {
			test('405 status when an invalid method is attempted', () => {
				const invalidMethods = ['patch', 'delete'];
				const methodPromises = invalidMethods.map((method) => {
					return request(app)
						[method]('/api/articles')
						.expect(405)
						.then(({ body: { msg } }) => {
							expect(msg).toBe('method not allowed');
						});
				});
				return Promise.all(methodPromises);
			});

			test('GET status 400 for a non-existent column', () => {
				return request(app)
					.get('/api/articles?sort_by=not_a_column')
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			// order query custom response
			// p custom response
			test('GET 400: for a negative articles per page limit', () => {
				return request(app)
					.get('/api/articles?limit=-1')
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('GET 404: for filtering by an author that does not exist', () => {
				return request(app)
					.get('/api/articles?author=nonexistentauthor')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No articles exist that match your filters');
					});
			});
			test('GET 404: for filtering by an author who has written no articles', () => {
				return request(app)
					.get('/api/articles?author=lurker')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No articles exist that match your filters');
					});
			});
			test('GET 404: for filtering by a topic that does not exist', () => {
				return request(app)
					.get('/api/articles?topic=atopicthatdoesnotexist')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No articles exist that match your filters');
					});
			});

			test('GET 404: for filtering by a topic with no articles', () => {
				return request(app)
					.get('/api/articles?topic=paper')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No articles exist that match your filters');
					});
			});
			test('GET 404: for filtering by existing author and topic combination with no results', () => {
				return request(app)
					.get('/api/articles?topic=paper&author=butter_bridge')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No articles exist that match your filters');
					});
			});
			//POST
			test('POST 400: returns a "Bad Request" error message when missing required fields', () => {
				return request(app)
					.post('/api/articles')
					.send({})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('POST 400: returns a "Bad Request" error message when trying to reference a topic that does not exist in the topics table', () => {
				return request(app)
					.post('/api/articles')
					.send({
						title: 'A topic that does not exist',
						body: 'I am testing trying to link to a non-existent topic',
						topic: 'hippopotamus',
						username: 'icellusedkars',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('POST 400: returns a "Bad Request" error message when trying to reference a username that does not exist in the users table', () => {
				return request(app)
					.post('/api/articles')
					.send({
						title: 'A topic that does not exist',
						body: 'I am testing trying to link to a non-existent topic',
						topic: 'mitch',
						username: 'idonotexist',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
		});
		describe('api/articles/:articleid', () => {
			// GET
			// PATCH
			// DELETE
			test('GET 404:returns a custom error message for a well-formed endpoint that does not exist', () => {
				return request(app)
					.get('/api/articles/123456')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No article was found with an ID of: 123456');
					});
			});
			test('PATCH 404:return custom error message for a well-formed endpoint that does not exist', () => {
				const increaseBy = { inc_votes: 5 };
				return request(app)
					.patch('/api/articles/987')
					.send(increaseBy)
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No article was found with an ID of: 987');
					});
			});

			test('PATCH 400: returns "Bad Request" for an invalid ID', () => {
				const increaseBy = { inc_votes: 5 };
				return request(app)
					.patch('/api/articles/abcdefg')
					.send(increaseBy)
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('PATCH 400: returns a  "Bad Request" error message when the inc_votes field is missing', () => {
				return request(app)
					.patch('/api/articles/1')
					.send()
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request, no vote has been received');
					});
			});
			test('PATCH 400: returns "Bad Request" error message when the sent value is the wrong data type', () => {
				const increaseBy = { inc_votes: 'ten' };
				return request(app)
					.patch('/api/articles/1')
					.send(increaseBy)
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});

			test('DELETE 404: should return a custom error message when given a well formed endpoint that does not exist', () => {
				return request(app)
					.delete('/api/articles/999')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe('No article was found with an ID of: 999');
					});
			});
			test('DELETE 400: should return a "Bad Request"  error message for an invlaid article_id endpoint', () => {
				return request(app)
					.delete('/api/articles/InvalidId')
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
		});
		describe('api/articles/:article_id/comments', () => {
			// get comment
			test('GET 400: "Bad Request" for a non-existent column', () => {
				return request(app)
					.get('/api/articles/1/comments?sort_by=not_a_column')
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			// order query

			test('POST 400: returns a "Bad Request" error message when missing required fields', () => {
				return request(app)
					.post('/api/articles/5/comments')
					.send({})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
			test('POST 400: returns a "Bad Request" error message when the username does not match a user in referenced user table', () => {
				return request(app)
					.post('/api/articles/5/comments')
					.send({
						body: 'I am testing trying to link to a non-existent topic',
						username: 'idonotexist',
					})
					.expect(400)
					.then(({ body }) => {
						expect(body.msg).toBe('Bad Request');
					});
			});
		});
	});
	describe('Comments', () => {
		describe('PATH: api/comments', () => {
			describe('PATH: /comments/:commentid', () => {
				test('405 status when an invalid method is attempted', () => {
					const invalidMethods = ['get', 'post'];
					const methodPromises = invalidMethods.map((method) => {
						return request(app)
							[method]('/api/comments/1')
							.expect(405)
							.then(({ body: { msg } }) => {
								expect(msg).toBe('method not allowed');
							});
					});
					return Promise.all(methodPromises);
				});

				test('PATCH 404:return custom error message for a well-formed endpoint that does not exist', () => {
					const increaseBy = { inc_votes: 5 };
					return request(app)
						.patch('/api/comments/99999')
						.send(increaseBy)
						.expect(404)
						.then(({ body }) => {
							// console.log(body)
							expect(body.msg).toBe('No comment exists with an ID of: 99999');
						});
				});
				test('PATCH 404:return custom error message for a well-formed endpoint when its article has been deleted', () => {
					return request(app)
						.delete('/api/articles/9')
						.then(() => {
							const increaseBy = { inc_votes: 5 };
							return request(app)
								.patch('/api/comments/1')
								.send(increaseBy)
								.expect(404)
								.then(({ body }) => {
									expect(body.msg).toBe('No comment exists with an ID of: 1');
								});
						});
				});

				test('PATCH 400: returns "Bad Request" for an invalid ID', () => {
					const increaseBy = { inc_votes: 5 };
					return request(app)
						.patch('/api/comments/abcdefg')
						.send(increaseBy)
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).toBe('Bad Request');
						});
				});
				test('PATCH 400: returns a  "Bad Request" error message when the inc_votes field is missing', () => {
					return request(app)
						.patch('/api/comments/1')
						.send()
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).toBe('Bad Request, no vote has been received');
						});
				});
				test('PATCH 400: returns "Bad Request" error message when the sent value is the wrong data type', () => {
					const increaseBy = { inc_votes: 'ten' };
					return request(app)
						.patch('/api/comments/1')
						.send(increaseBy)
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).toBe('Bad Request');
						});
				});

				test('DELETE 404: should return a custom error message when given a well formed endpoint that does not exist', () => {
					return request(app)
						.delete('/api/comments/999')
						.expect(404)
						.then(({ body }) => {
							expect(body.msg).toBe('No comment exists with an ID of: 999');
						});
				});
				test('DELETE 400: should return a "Bad Request"  error message for an invlaid comment ID endpoint', () => {
					return request(app)
						.delete('/api/comments/InvalidId')
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).toBe('Bad Request');
						});
				});
			});
		});
	});
	describe('/missing route', () => {
		test('status 404 for all GET routes', () => {
			return request(app)
				.get('/missingroute')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toBe('Route not found');
				});
		});
	});
});
