require('dotenv').config();
const nodemailer = require('nodemailer');
const config = {
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
};
const transporter = nodemailer.createTransport(config);

module.exports = transporter;
