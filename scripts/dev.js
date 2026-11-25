process.env.NODE_ENV = 'dev';

// eslint-disable-next-line import/no-extraneous-dependencies
require('nodemon')({
  script: 'src/server.js',
  watch: ['src'],
});
