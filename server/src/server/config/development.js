module.exports = {
  db: {
    url: "test"
  },
  logging: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000000000
};
