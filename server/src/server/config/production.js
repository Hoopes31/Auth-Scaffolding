module.exports = {
  seed: true,
  logging: true,
  secrets: {
    jwt: `${process.env.SECRET}`
  },
  expireTime: 500000
};
