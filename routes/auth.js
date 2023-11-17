/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-styring}.
 *
 */

router.post('/register', async function (req, res, next) {
  try {
    const { username } = req.body;
    const userExists = await User.exists(username);
    if (userExists) {
      return res.status(400).json({ message: `There already exists a user with username '${username}'`, status: 400 });
    } else {
      const user = await User.register(req.body);
      const token = jwt.sign({ username, is_admin: user.is_admin }, SECRET_KEY);
      return res.status(201).json({ token });
    }
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    // ** Bug #5 ** //
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
