process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });

  describe("api/topics", () => {
    test("GET 200: responds with all topics, which have the correct keys", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          const { topics } = res.body;
          expect(topics).toEqual(expect.any(Array));
          expect(topics[0]).toHaveProperty("slug");
          expect(topics[0]).toHaveProperty("description");
        });
    });
  });
});

/*
GET /api/users/:username

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
POST /api/topics
POST /api/users
GET /api/users
*/
