// lib/app.ts
import express = require("express");
import createError = require("http-errors");
import path = require("path");

// Create a new express application instance
const app: express.Application = express();

//Routes
var booksRouter = require('./books/booksRoutes');

//View engine
app.use('/books', booksRouter);

//
app.get("/", (req: any, res) => {
  res.send("Hello World! Again!");
});



app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// catch 404 and forward to error handler copied from Express default scaffolding
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler copied from Express default scaffolding
app.use((err: any, req: any, res:any, next:any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
