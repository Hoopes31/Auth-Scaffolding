# MERN JWT Auth Scaffolding

Basic useful feature list:

 * Server is built with express and runs JWT Auth
 * Client is built with create-react-app and has basic functionality

Put it to use!

 1. Navigate to both client and server and run an install
 2. 'npm i' for server
 3. 'yarn install' for client 
 4. Create a .env in the server folder as follows
 
 ```javascript
 PORT = 3001
 SECRET = 'YOUR_SECRET'
 ```
 * DB SETUP: Navigate to the config folder and adjust your environment files to match your db settings.
 Default is set to test.

 ```javascript
 db: {
     url: "enter your mongo db name here"
 }
 ```

 * SERVER START: Navigate to server folder and type: 'npm start'
 * CLIENT START: Navigate to client folder and type: 'yarn start'

Built with the help of Scott Moss' Lynda Tut! :+1:
