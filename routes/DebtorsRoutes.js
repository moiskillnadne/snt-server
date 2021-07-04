const express = require('express');
const router = express.Router();
const debt = require('../Debtors.json');
const fs = require('fs');

// REST API FOR Debtors

router.post('/delete', (req, res) => {
	const dataAboutItem = req.body;
	const debtList = debt;

	debtList.content.splice(dataAboutItem.index, 1);
	fs.writeFile('./Debtors.json', JSON.stringify(debtList), (err) =>
		console.log('Server error from route `/docs/delete`. Error look like', err),
	);
	res.sendStatus(200);
});

router.get('/get', (req, res) => {
	const debtList = debt;

	res.json(debtList);
});

router.post('/post', (req, res) => {
	const { title, content, date, id } = req.body
	const debtList = debt;

	debtList.content.push({
		title,
		link: content,
		date,
		id,
	});

	fs.writeFile('./Debtors.json', JSON.stringify(debtList), (err) => {
		console.log(
			'Server error from route `/debtors/delete`. Error look like',
			err,
		)

		res.status(500).json({
			msg: 'Item writting failed',
			errorContext: err,
		})
	}
	);


	res.status(200).json({
		msg: 'Success'
	})
});

module.exports = router;
