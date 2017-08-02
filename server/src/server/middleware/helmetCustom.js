const helmet = require('helmet')

function helmetCustom(app) {
    console.log(`localhost:${process.env.PORT}`)
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", `localhost:${process.env.PORT}`],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    }))
    app.use(helmet.referrerPolicy({policy: 'no-referrer'}))
    app.use(helmet.hidePoweredBy({setTo: "The Death Star"}))
}

module.exports = helmetCustom