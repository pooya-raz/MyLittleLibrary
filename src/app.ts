// lib/app.ts
import cookieParser = require("cookie-parser")
import express = require("express");
import createError = require("http-errors");
import path = require("path");
const PORT = process.env.PORT || 3000;

// Create a new express application instance
const app: express.Application = express();

//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.get("/", (req, res) => {
  res.send("Hello World! Again!");
});

//Routes
var booksRouter = require('./books/booksRoutes');

//View engine
app.use('/api/books', booksRouter);




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
  res.send('Error 500');
});

app.listen(PORT, () => {
  console.log("MyLittleLibrary start at localhost:3000");
});


module.exports = app;
