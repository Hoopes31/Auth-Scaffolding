const logger = require("../../util/logger")

exports.root = (req, res) => {
    console.log('Profile Route Hit')

    //Mock Data Set for return
    const someData = {
        user1: "Tony",
        user2: "Li"
    }

    //Watch it LOG
    console.log(someData)

    //Send it to your Client as a JSON object
    res.json(someData)

    //Don't break your server
    res.end()
}