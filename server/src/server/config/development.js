module.exports = {
  db: {
    url: "development"
  },
  seed: true,
  logging: true,
  secrets: {
    jwt: `${process.env.SECRET}`
  },
  expireTime: 500000
};
