const app = require('./app');
const db = require('./db/connection');

const port = process.env.PORT || 8080;

function start() {
  app.listen(port, () => {
    console.log(`Listening on port ${port}/n ${process.env.DB_URL}`);
  });
}

db.ready
  .then(start)
  .catch((error) => {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  });
