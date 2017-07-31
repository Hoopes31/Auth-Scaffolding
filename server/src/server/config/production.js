module.exports = {
  db: {
    url: "production"
  },
  seed: true,
  logging: true,
  secrets: {
    jwt: `${process.env.SECRET}`
  },
  expireTime: 500000
};
