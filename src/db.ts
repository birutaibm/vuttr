import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const url = process.env.DB_PROTOCOL + '://' +
    process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_CLUSTER + '/' +
    process.env.DB_COLLECTION + '?' + process.env.DB_QUERY;

export default {
  connect: () => mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
};
