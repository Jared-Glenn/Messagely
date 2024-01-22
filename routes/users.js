const express = require('express');
const router = express.Router();
const User = require("../models/user");
const ExpressError = require('../expressError');

const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', async (req, res, next) => {
    try {
        const results = await User.all();
        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', ensureLoggedIn, async (req, res, next) => {
    try {
        const results = await User.get(req.params.username);

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Can't find username: ${req.params.username}`, 404);
        }
        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', async (req, res, next) => {
    try {
        const results = await User.messagesTo(req.params.username);

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Can't find messages to: ${req.params.username}`, 404);
        }

        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/from', async (req, res, next) => {
    try {
        const results = await User.messagesFrom(req.params.username);

        console.log(results);

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Can't find messages from: ${req.params.username}`, 404);
        }

        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})


module.exports = router;