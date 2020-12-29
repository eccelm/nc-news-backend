const {
  formatDate,
  createReferenceObj,
  formatComments,
} = require("../db/utils/data-manipulation");

describe("formateDate", () => {
  test("should return a new array", () => {
    const testArray = [{ key: "hello" }];
    const returnValue = formatDate(testArray);
    expect(testArray).not.toEqual(returnValue);
  });

  test("should not mutate the input", () => {
    const testArray = [{ key: "hello" }];
    formatDate(testArray);
    expect(testArray).toEqual(testArray);
  });

  test("should return an object with the 'created at' timestamp correctly formatted when passed a one-item array", () => {
    const article = [
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: 1416140514171,
      },
    ];
    const expectedOutput = [
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: new Date(1416140514171),
      },
    ];
    expect(formatDate(article)).toEqual(expectedOutput);
  });

  test("should return an object with the 'created at' timestamps correctly formatted when passed a multi-ttem array", () => {
    const multipleArticles = [
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: 1416140514171,
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: 1416140514171,
      },
    ];
    const expectedOutput = [
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: new Date(1416140514171),
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell....",
        created_at: new Date(1416140514171),
      },
    ];
    expect(formatDate(multipleArticles)).toEqual(expectedOutput);
  });
});

describe("createReferenceObj", () => {
  test("should return an empty object when passed an empty array", () => {
    const emptyArray = [];
    const expectedOutput = {};
    expect(createReferenceObj(emptyArray)).toEqual(expectedOutput);
  });
  test("should not mutate the input", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    createReferenceObj(input);
    expect(input).toEqual([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ]);
  });
  test("should return an object with a title:article_id k/v pair when passed one article", () => {
    const singleArticle = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(createReferenceObj(singleArticle, "title", "article_id")).toEqual({
      "Living in the shadow of a great man": 1,
    });
  });

  test("should return an object with a k/v pair for every article in a multi-item array", () => {
    const multipleArticles = [
      {
        article_id: 6,
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        article_id: 7,
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    expect(createReferenceObj(multipleArticles, "title", "article_id")).toEqual(
      {
        A: 6,
        Z: 7,
      }
    );
  });
});

describe.only("formatComments", () => {
  test("should return a new array", () => {
    const singleComment = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const referenceObj = {
      "Living in the shadow of a great man": 1,
    };
    expect(formatComments(singleComment, referenceObj)).toEqual(
      expect.any(Array)
    );
    expect(formatComments(singleComment, referenceObj)).not.toEqual([
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ]);
  });
  test("the new array should contain a new object with the correctly formatted keys, when passed a single comment", () => {
    const singleComment = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const referenceObj = {
      "Living in the shadow of a great man": 1,
    };
    const expectedOutput = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        author: "butter_bridge",
        article_id: 1,
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(formatComments(singleComment, referenceObj)).toEqual(expectedOutput);
  });
  test("should return an array of comment objects in the correct format when passed an array with multiple comments", () => {
    const inputComments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const refObject = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 9,
    };

    const expectedOutput = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 9,
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        author: "butter_bridge",
        article_id: 1,
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(formatComments(inputComments, refObject)).toEqual(expectedOutput);
  });

  test("should  not mutate the input comments array", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const refObject = {
      "Living in the shadow of a great man": 1,
    };
    formatComments(input, refObject);
    expect(input).toEqual([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ]);
  });
});
