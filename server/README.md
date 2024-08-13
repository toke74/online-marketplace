# 1. User Controller

## 1.1) Steps to register user

```js
// @desc Register user
// @route POST /api/v1/user/register
// @access Public
```

1. Get user email, password and name from req.body
2. Check if the use exist in database by using user email
3. If user exist with that email, throw error back to client
4. If user does not exist with the email, then save the user to database
5. After user created in DB, send activation code to user email
6. And also send activation token to the client

## 1.2) Steps to activate user

```js
// @desc    Activate user
// @route   POST /api/v1/user/activate-user
// @access  Public
```

1. Get activation token and activation code from req.body
2. verify activation token
3. if activation token is valid, then verify activation code. if not valid, throw error
4. if activation code is valid, find user
5. if user not exist, throw the error
6. if user exist and isVerified field is true, throw the error ask user to login
7. if user not exist and isVerified field is false, update the user as verified
8. Then send success message to client

## 1.3) Steps to login user

```js
// @desc    Activate user
// @route   POST /api/v1/user/activate-user
// @access  Public
```

1. Get email and password from client by req.body
2. check email and password empty or not
3. find user in DB
4. if user not exist in DB throw error
5. if user tries to login by their Google service provider account, throw error
6. if user tries to login by their Github service provider account, throw error
7. if user exist in DB, Check if the user verified their ema
8. If user not verified their email address, Send activation code to the user
9. if verified their email, Check password matches
10. if password not match, throw error
11. if very thing is ok , send access Token and refresh token to client by cookies

## 1.4) Steps to Resend Activation code

```js
// @desc    Resend Activation code
// @route   POST /api/v1/user/resend-activation-code
// @access  Public
```

1. Get user email from client by req.body
2. find user in db by its email
3. if user not exist, throw the error
4. if user exist and isVerified field is true, throw the error ask user to login
5. if user exist and isVerified field is false, Send activation code to the user
6. finally send success message to client

## 1.5) Steps to implement Social Auth

```js
// @desc Social Auth
// @route POST /api/v1/user/social-auth
// @access Public
```

1. Get user info from client which we get it from social auth provider
2. Find if user exist by its email
3. If user not exist, generate password and save user in db
4. After saving user in db, generate access and refresh token and send it to client
5. If user exist in db, check if user register with local login with that email, if it is throw error
6. If user exist in db and register with social auth, login the user by generate access and refresh token and send it to client

## 1.6) Steps to implement to Logout user

```js
// @desc    Logout user
// @route   GET /api/v1/user/logout
// @access  Public
```

1. Clear the cookie
2. Send success message to client

## 1.7) Steps to implement Authenticate User middleware

```js
// @desc   Authenticate User middleware
// @access  Private
```

1. Get access token from req.cookies
2. If access token empty, throw error
3. If access token not empty, verify validity of the token
4. If not valid token, throw error
5. If it is valid token, find user from db by using decoded ID from jwt.verify()
6. If user not found in db, throw error
7. If user exist in db, assign to req.user
8. then pass to next function
