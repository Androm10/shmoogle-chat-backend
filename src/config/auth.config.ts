export default () => ({
  auth: {
    secret: process.env.AUTH_SECRET || 'secret',
    expiresIn: process.env.AUTH_EXPIRES || '1h',
  },
  authGoogle: {
    secret: process.env.GOOGLE_SECRET || 'secret',
    appId: process.env.GOOGLE_APP_ID || 'shmoogle-chat',
    callbackUrl: process.env.GOOGLE_CALLBACK || 'http://localhost:3000/welcome',
  },
});
