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

const formatComments = (commentData, articleRef) => {
  return commentData.map(({ belongs_to, created_by, ...restOfComment }) => {
    const newComment = {
      article_id: articleRef[belongs_to],
      author: created_by,
      ...restOfComment,
    };
    return newComment;
  });
};

module.exports = { formatDate, createReferenceObj, formatComments };
