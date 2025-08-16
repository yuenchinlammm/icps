require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/claims', require('./routes/claim.routes'));
app.use('/api',        require('./routes/document.routes'));

module.exports = app;
