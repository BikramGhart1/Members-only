# Members Only
is an application where users can sign up and log in to post their posts and become a member to see the author of the posts


# Technologies used
1. node js
2. express js
3. postgresql
4. ejs engine

# extra libraries used
1. passport js
2. passport-local
3. express-validator
4. express-session
5. nodemon
6. bcryptjs
7. dotenv
8. connect-flash

# Features 
1. Authentication and authorization

main point of this project was to learn authentication and I have used passport js, localstrategy method
> localstrategy will authenticate the user
> serializeUser will save the user's id in session
> deserializeUser will use that id to fetch the data from database
> finally above middlewares will be called when passport.authenticate is called wrapping all of them in background
> also bcryptjs is used to securely push password to database

