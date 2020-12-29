const formatDate = (data) => {
  return data.map((object) => {
    const newObject = { ...object };

    newObject.created_at = new Date(object["created_at"]);

    return newObject;
  });
};

module.exports = { formatDate };
