const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const db = app.database()

  // todo
  // your code here
  return db.collection('todos').add({
    age: '20',
    city: '天津',
    name: 'tom'
  })
};
