# 1. User Controller

## 1.1) Steps to register users

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

## 1.1) Steps to register users

```js
// @desc Register user
// @route POST /api/v1/user/register
// @access Public
```
