const formatDate = (data) => {
  return data.map((object) => {
    const newObject = { ...object };

    newObject.created_at = new Date(object["created_at"]);

    return newObject;
  });
};

const createReferenceObj = (rows, nameKey, idKey) => {
  const ref = {};

  rows.forEach((row) => {
    ref[row[nameKey]] = row[idKey];
  });
  return ref;
};

module.exports = { formatDate, createReferenceObj };
