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
	describe('/missing route', () => {
		test('status 404 for all methods', () => {
			return request(app)
				.get('/missingroute')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toBe('Route not found');
				});
		});
	});

	describe('Topics', () => {
		// 405 invalid methods
		// 400 misformed post
	});

	// api closing
});
