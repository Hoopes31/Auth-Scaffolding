module.exports = {
  db: {
    url: "test"
  },
  seed: true,
  logging: false,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
