module.exports = {
    db: {
    url: "testing"
  },
  logging: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
