'use strict';
const Sample = {};

/** Private Functions */
const getGreetingMessage = () => {
	return 'Welcome to sample app';
};

/** Public Functions */
Sample.greet = (req, res) => {
	res.send({ message: getGreetingMessage() });
};
module.exports = { Sample };
