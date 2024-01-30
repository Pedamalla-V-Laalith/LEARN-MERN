const express = require('express');
const app = express();
const cors = require('cors')

const adminRouter = require(__dirname+"/routes/admin.js");
const userRouter = require(__dirname+"/routes/user.js");
/*
in the above commands we are importing the files which contains admin and user routes
we could import this because we exported certain "Router" in those individual files
about which you will learn in those files.
*/


app.use(cors())
app.use(express.json())

app.use("/admin",adminRouter)
app.use("/user",userRouter)
/*
Using the above commands will result in result in the following:-
whenever a route is hit at the user side starting with /admin then that request will be
handled by the route handlers in the file admin.js because we exported Router in that file
Same goes with /user route requests.

And the important thing is, basically adminRouter and userRouter contains the router which
was exported by admin.js and user.js respectively

And one more thing if you need to hit a route:-
for example, /admin/me
then in admin.js it needs to be written like this:- /me
because in the above code we already metioned "/admin"
if in admin.js we write /admin/me itself then it will think the route we are handling is:- /admin/admin/me
*/

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
