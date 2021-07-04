const express = require('express');
const router = express.Router();
const news = require('../News.json');
const fs = require('fs');

// REST API FOR NEWS

router.post('/delete', (req, res) => {
	const dataAboutItem = req.body;
	const newsList = news;

	newsList.content.splice(dataAboutItem.index, 1);
	fs.writeFile('./News.json', JSON.stringify(newsList), (err) =>
		console.log('Server error from route `/news/delete`. Error look like', err),
	);
	res.sendStatus(200);
});

router.get('/get', (req, res) => {
	const newsList = news;

	res.json(newsList);
});

router.post('/post', (req, res) => {
	const { title, content, date, id } = req.body
	// const body = {
	// 	title: string,
	// 	news: string,
	// 	date: string,
	// 	id: string,
	// }

	const newsList = news;

	newsList.content.push({
		title,
		news: content,
		date,
		id
	});

	fs.writeFile('./News.json', JSON.stringify(newsList), (err) => {
		console.log('Server error from route `/news/post`. Error look like', err)
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
