const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const WHMCS_IDENTIFIER = process.env.WHMCS_IDENTIFIER;
const WHMCS_SECRET = process.env.WHMCS_SECRET;
const WHMCS_API_URL = process.env.WHMCS_API_URL; // e.g. https://yourdomain.com/includes/api.php

app.post('/api/whmcs', async (req, res) => {
  const { action, parameters } = req.body;

  const postData = {
    identifier: WHMCS_IDENTIFIER,
    secret: WHMCS_SECRET,
    action: action,
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
