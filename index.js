const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const WHMCS_IDENTIFIER = LL8XN1SMQzLsLEoiM7mR9CHpHRPzRYks;
const WHMCS_SECRET = R9rgqm9Bujq6SZzE8XUCdPUtd8zYq75g;
const WHMCS_API_URL = https://bizportal.cloud/includes/api.php; // e.g. https://yourdomain.com/includes/api.php

app.post('/api/whmcs', async (req, res) => {
  const { action, parameters } = req.body;

  const postData = {
    identifier: WHMCS_IDENTIFIER,
    secret: WHMCS_SECRET,
    action: 'GetClients',
    responsetype: 'json',
    ...parameters,
  };

  try {
    const response = await axios.post(
      WHMCS_API_URL,
      new URLSearchParams(postData),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

module.exports = app;
