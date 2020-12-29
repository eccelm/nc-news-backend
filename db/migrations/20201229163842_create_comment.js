exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("users.username");
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .onDelete("CASCADE");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.text("body").notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
