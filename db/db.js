const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('mongoose connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose disconnected to ');
});

mongoose.connection.on('error', (error) => {
  console.log('mongoose error ', error);
});
