const express = require('express');
const router = express.Router();
const faq = require('../Faq.json');
const fs = require('fs');

// REST API FOR FAQ

router.get('/get', (req, res) => {
	const faqList = faq;

	res.json(faqList);
});

router.post('/post', (req, res) => {
	const { title, content, date, id } = req.body
	const faqList = faq;

	faqList.faq.push({
		question: title,
		answer: content,
		date,
		id
	});

	fs.writeFile('./Faq.json', JSON.stringify(faqList), (err) => {
		console.log('Server error from route `/faq/post`. Error look like', err)
		res.status(500).json({
			msg: 'Item writting failed',
			errorContext: err,
		})
	});

	res.status(200).json({
		msg: 'Success'
	})
});

module.exports = router;
