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

			test('PATCH returns 202 and increases the vote count by the passed amount', () => {
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
			test('PATCH returns 202 and decreases the vote count by the passed amount', () => {
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
		});

		describe('PATH: /:article_id/comments', () => {
			// comments on individual articles
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
	// api closing
});
