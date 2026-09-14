const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
	console.log(`Backend listening on port ${port}`);
});