exports.up = function (knex) {
  return knex.schema.createTable("topics", (topicsTable) => {
    "";
    topicsTable.string("slug", 35).unique().primary().notNullable();
    topicsTable.text("description").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("topics");
};
