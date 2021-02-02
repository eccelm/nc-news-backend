process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');
/*
invalid column
query provides the wrong data type
not enough information is provided
too much information is provided
data is formatted correctly, but is still un-processable? (eg. an id that doesn't exist)
*/

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
			test('Post 400 returns an error message when the username already exists in the database', () => {
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

	describe('Comments', () => {
		// PATCH AND DELETE
		describe('PATH: api/comments', () => {
			describe('PATH: /comments/:commentid', () => {
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

				test.only('DELETE 404: should return a custom error message when given a well formed endpoint that does not exist', () => {
					return request(app)
						.delete('/api/comments/999')
						.expect(404)
						.then(({body}) => {
							expect(body.msg).toBe('No comment exists with an ID of: 999');
						})
				});
				test('DELETE 400: should return a "Bad Request"  error message for an invlaid comment ID endpoint', () => {
					return request(app)
						.delete('/api/comments/InvalidId')
						.expect(400)
						.then(({body}) => {
							expect(body.msg).toBe('Bad Request');
						})
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
