# SBA319 MongoDB Database Application

This skill based assessment tested my knowledge of MongoDB by creating 3 different data collections within the database in conjunction with Mongoose. The three collections are users, posts, comments, all with get, get id, post, put, and delete routes. 

## 

The base route for users are:

http://localhost:3000/api/users/

The base route for comments are:

http://localhost:3000/api/comments/

The base route for posts are:

http://localhost:3000/api/posts/

##

To create a user, comment, or post, call a post request using the base routes with the necessary inputs (an example for user would be {fname: "John", lname: "Smith", username: "JohnSmith", email: "johnsmith@gmail.com"}).

You can also get all users by calling a get request using the base route.

##

To get, delete, or update a specific user, call a get, delete, or put route respectively with the id of the user after the base route. 

ex. http://localhost:3000/api/users/{id}




