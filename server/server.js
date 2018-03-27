/**
 * Main file to start our node server
 */

'use strict';
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send({ message: 'Welcome' });
});

app.listen(PORT, (e) => {
	if (!e) {
		console.log(`Server started successfully on port ${PORT}`);
	} else {
		console.log(`Error starting server at port ${PORT}: `, e);
	}
});
