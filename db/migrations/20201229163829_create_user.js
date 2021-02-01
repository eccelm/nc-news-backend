exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username", 20).unique().primary().notNullable();
    usersTable.text("avatar_url");
    usersTable.text("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
