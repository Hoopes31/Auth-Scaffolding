module.exports = {
  db: {
    url: "development"
  },
  logging: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
