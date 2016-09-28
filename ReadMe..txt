
#Technologies Used

  * Angular.JS 1.0
  * Node.JS
  * Express.JS
  * HTML , MaterializeCSS


#
  * A http request is made to the server using the $http service a core angular Service, the URL is sent in the body of the request.
  * The server takes the requests.
  * The URL in the body of the request is broken down and using parse-github-url.
  * Used node-github package to access information from the github repositoriesprovided by the client.
  * As GitHub API calls don't require authentication , which may be required only to change data or read sensitive
    information a user have to be authenticated.


  * Used various npm modules some of the important ones are.
    1. parse-github-url : To break the URL(the github URL) sent by the client and extract the name of the Repository and owner etc.
    2. github : which is a Node.js wrapper for GitHub API.
    3. Moment: this is for Parsing, validating, manipulating, and displaying dates in JavaScript.


 Given More time
  * more things can be added to the existing app
  * performance can be improved by writing better logic in the functions used to check from-to dates
  * More time could have been spent in testing the app to make sure it does not encounter an error.
  * UI could hae been improved
  * The amount of time required to collect data from the repositories could be checked and maybe improve.


   Thank You.