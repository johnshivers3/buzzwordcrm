const express = require('express');
const CalendlyService = require('../services/calendlyService');
const { isUserAuthenticated, formatEventDateTime } = require('../utils');
const router = express.Router();

router
    .get('/scheduled_events', isUserAuthenticated, async (req, res) => {
        const { access_token, refresh_token } = req.user;
        const { count, page_token, user } = req.query;
        const calendlyService = new CalendlyService(access_token, refresh_token);

        const {
            collection,
            pagination
        } = await calendlyService.getUserScheduledEvents(user, count, page_token);
        const events = collection.map(formatEventDateTime);

        res.json({ events, pagination });
    })
    .post('https://api.calendly.com/webhook_subscriptions', isUserAuthenticated, async (req, res) => {
        const { access_token, refresh_token } = req.user;
        const calendlyService = new CalendlyService(access_token, refresh_token);
        res.json({data:'webhooks'})
    })


module.exports = router;
