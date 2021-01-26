exports.up = function (knex) {
  return knex.schema.createTable("topics", (topicsTable) => {
    "";
    topicsTable.text("slug").unique().primary().notNullable();
    topicsTable.text("description");
    console.log("2 I've added two columns to topics");
  });
};

exports.down = function (knex) {
  console.log("1 I've dropped Topics");
  return knex.schema.dropTable("topics");
};
