const helmet = require('helmet')

function helmetCustom(app) {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'localhost:3000']
        }
    }))
    app.use(helmet.referrerPolicy({policy: 'same-origin'}))
}

module.exports = helmetCustom