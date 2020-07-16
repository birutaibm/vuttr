import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

export default {
  jwt: {
    secret: process.env.APP_SECRET || '',
    expiresIn: '1h',
  },
};
