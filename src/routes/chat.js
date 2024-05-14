const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/auth");

router.get("/home", isAuthenticated, (req, res) => {
  
  const params = { user: JSON.stringify(req.user), nick: req.user?.nick };
  console.log(params.nick, "connect to Be-Memory");
  res.render("home/home", params);
  
});

module.exports = router;
