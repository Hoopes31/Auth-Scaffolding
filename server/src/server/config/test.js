module.exports = {
  db: {
    url: "test"
  },
  logging: false,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
