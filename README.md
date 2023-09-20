#  Assignment cuvette

<br><br/>
<h1>User Registration - OTP based</h1>

# Version -1.0.0
##

**Features**


-User can register with their details (ex. name,email,phone,password )

-User will receive an OTP to their provided email/phone

-After verifying the OTP User will register to Database

# To Start the Project

1.Install all the dependencies.
```js
npm install
```
2.Create **.env** file in root of Project referring to **.env.example** file.

3.Run the Application.
   ```js
   npm start
   ```

   # Register and send OTP- method(POST)
  1. **endpoint**
   ```js
   {baseurl}/register
   ```
  2. **request body**
    ```
    "firstName": "value",
    "lastName": "value",
    "email": "value",
    "password":"value",
    "phone":"value"
     ```


   *this will send OTP you your email/phone and respond with user data along with hashedOTP and IPaddress data frontend will save the userData and hashedOTP for 
   verifying otp and send this data to request body of "{baserurl}/verify" and register after successfully verification*.

  # Verify OTP- method(POST)
  1. **endpoint**
     ```js
     {baseurl}/verify
     ```
  2. **request  body**
     ```{
     "enteredOTP:"value",
     "hashedOTP": "value",
     "lastName": "value",
     "email": "value",
     "password":"value",
     "phone":"value",
     "ipData:"value",
