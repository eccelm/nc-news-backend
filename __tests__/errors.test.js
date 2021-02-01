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
	
         test('POST 400: returns an error message when missing required fields', () => {
				return request(app)
					.post('/api/topics')
					.send({ description: 'I am missing the slug catergory' })
					.expect(400)
               .then(({body})=> {
                  expect(body.msg).toBe('Bad Request')
                })
      })

   test('POST 400: returns an error message when the slug exceeds set limit', () => {""
      return request(app)
         .post('/api/topics')
         .send({ slug: "Hello I am too long for the slug character limit", description: "a slug that is too long" })
         .expect(400)
         .then(({body})=> {
            expect(body.msg).toBe('Bad Request')
          })
})
		});
	});
   // api closing
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
