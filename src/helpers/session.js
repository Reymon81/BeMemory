const User = require("../models/User");

async function activateSession(nick) {
  const user = await User.findOne({ nick });
  user.connected = true;
  await user.save();
}

 async function desactivateSession(nick) {
  const user = await User.findOne({ nick });
  user.connected = false;
  await user.save();
}

module.exports = {activateSession, desactivateSession};