const { formatDate } = require("../db/utils/data-manipulation");

describe("formatDate", () => {
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
