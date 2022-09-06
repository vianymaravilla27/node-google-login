var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("./passport-setup");

app.use(cors());

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get("/failed", (req, res) => res.send("You Failed to log in!"));

app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user.displayName}!`)
);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
   
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});



const maxAge = 3600000 * 24; // 1day
app.use(express.static(path.join(__dirname, 'build'), { maxAge: maxAge }));
app.get("*", (req, res) => {
  res.sendfile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;