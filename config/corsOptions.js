const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:2727',
    'http://localhost:2727',
    `https://swiggy-vivek.vercel.app/`,
    process.env.FRONTEND_HOMEPAGE,
  ],
  credentials: true,
  methods: 'POST, GET',
};
module.exports = corsOptions;
