module.exports = {
  db: {
    url: "development"
  },
  logging: true,
  seed: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
