module.exports = {
  db: {
    url: "test"
  },
  logging: true,
  seed: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
