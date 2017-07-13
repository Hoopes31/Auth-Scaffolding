module.exports = {
    db: {
    url: "testing"
  },
  seed: true,
  logging: true,
  secrets: {
    jwt: "process.env.SECRET"
  },
  expireTime: 500000
};
