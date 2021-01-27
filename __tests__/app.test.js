process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("PATH: /api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });

  describe("PATH: api/topics", () => {
    test("GET 200: responds with an array of all topics, each topic has ", () => {
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
    test.only("POST 201: successfully adds a new topic, returning the post details and confirmation message", () => {
      return request(app)
        .post("/api/topics")
        .send({ slug: "testing", description: "I am a test" })
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
            slug: "testing",
            description: "I am a test",
          });
        });
    });
    // topics closing
  });

  describe("PATH: api/users", () => {
    test("GET 200: responds with an array of all users, and each user object has the correct keys", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          const { users } = res.body;
          expect(users).toEqual(expect.any(Array));
          expect(users[0]).toHaveProperty("name");
          expect(users[0]).toHaveProperty("username");
          expect(users[0]).toHaveProperty("avatar_url");
        });
    });

    describe("PATH /:username", () => {
      test("GET 200: responds with an object of the user with the correct keys", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then((res) => {
            const { user } = res.body;
            expect(user).toEqual(expect.any(Object));
            expect(Object.keys(user)).toEqual(
              expect.arrayContaining(["username", "avatar_url", "name"])
            );
            expect(user.username).toBe("lurker");
          });
      });
      // users/:username closing
    });
    // users closing
  });

  // api closing
});
