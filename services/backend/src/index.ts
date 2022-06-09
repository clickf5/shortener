import mongoose from 'mongoose';
import app from './app';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shortener';

const start = async () => {
  try {
    await mongoose.connect(mongodbUri, {});
    await app.listen(port, host);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
