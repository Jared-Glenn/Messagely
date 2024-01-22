const express = require('express');
const router = express.Router();
const Message = require("../models/message");
const ExpressError = require('../expressError');
const { ensureCorrectUser } = require('../middleware/auth');

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get('/:id', ensureCorrectUser, async (req, res, next) => {
    try {
        const results = await Message.get(req.params.id);

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Can't find message with id: ${req.params.id}`, 404);
        }
        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/:username', ensureCorrectUser, async (req, res, next) => {
    try {
        let { to_username, body } = req.body;
        const results = await Message.create({from_username: req.params.username, to_username: to_username, body: body});

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Username of recipient and body of message required.`, 400);
        }

        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post('/:username/:id/read', ensureCorrectUser, async (req, res, next) => {
    try {
        const results = await Message.markRead(req.params.id);

        if (Object.keys(results).length === 0) {
            throw new ExpressError(`Could not find id: ${req.params.id}`, 404);
        }
        return res.json(results);
    }
    catch (e) {
        return next(e);
    }
})   


module.exports = router;