# MERN JWT Auth Scaffolding

## Basic useful feature list

 * Server is built with Express, MongoDB, JWT Auth, and mocha/chai for testing
 * Client is built with create-react-app, SASS, React-Bootstrap and karma/mocha/chai for tests.

## Put it to use!

 1. cd server
 2. npm i 
 3. cd ../client
 3. yarn install 
 4. Create a .env in the server folder as follows
 
 ```javascript
 PORT = 3001
 SECRET = 'YOUR_SECRET'
 ```
 ### DB SETUP: Navigate to the config folder and adjust your environment files to match your db settings
 
 Default is set to test.

 ```javascript
 db: {
     url: "enter your mongo db name here"
 }
 ```

 ## Project Start 
* npm start in base directory will start both servers.

## Customization


### Style
By default, the project uses the [Flatly](https://bootswatch.com/flatly/) Theme from Bootswatch. However, this is very easy to swap with scss. Inside the  client/styles/styles.scss, simply swap out flatly for another bootswatch or custom variables file. 
```scss
//this fixes an error with the icons, do not remove
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";

@import "_flatly_variables.scss"; 
//  ^^^ swap this out with another variables file to change theme
@import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
```
### Routes
There is some basic routing setup with a few functions to keep your users from accessing pages they should or shouldn't


##### protect
If you want a page to only be accessible after authenication, wrap the route's component prop with protect.
```jsx
<Switch>
    <Route path="/foo" component={this.protect(<Foo />)} />
</Switch>
```
##### loggedOutOnly
If you want the inverse of protect, use loggedOutOnly.
```jsx
<Switch>
    <Route path="/bar" component={this.loggedOutOnly(<Bar />)} />
</Switch>
```

Built with the help of Scott Moss' Lynda Tut! :+1:

### The MIT License (MIT)
Copyright 2017 Hoopes31 & nicholaswbowen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


