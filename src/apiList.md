
# DevTinderAPi

## authRouter
 - Post/ signup
 - Post/ login
 - Post/ logout

 ## profileRouter
 - Get/profile/view
 - PATCH/profile/edit
 - PATCH/profile/password

 ## connectionRequestRouter

  status = intrested, ignored
 - POST/request/send/:status/:userId
 - POST/request/send/:ignored/:userId

 status = accepted, rejected
 - POST/request/review/accepted/:reuestId
 - POST/request/review/rejected/:reuestId

 ## userRouter
 - GET/user/requests/received
 - GET/user/connections
 - GET/user/feed  - Get you the profiles  of other users on platform.