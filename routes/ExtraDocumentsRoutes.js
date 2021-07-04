const express = require('express');
const router = express.Router();
const docs = require('../ExtraDocuments.json');
const fs = require('fs');

// REST API FOR DOCUMENTS

router.post('/delete', (req, res) => {
    const dataAboutItem = req.body;
    const docsList = docs;

    docsList.content.splice(dataAboutItem.index, 1);
    fs.writeFile('./ExtraDocuments.json', JSON.stringify(docsList), (err) =>
        console.log('Server error from route `/docs/delete`. Error look like', err),
    );
    res.sendStatus(200);
});

router.get('/get', (req, res) => {
    const docsList = docs;

    res.json(docsList);
});

router.post('/post', (req, res) => {
    const { title, content, date, id } = req.body
    const docsList = docs;

    docsList.content.push({
        title,
        link: content,
        date,
        id,
    });

    console.log(docsList);

    fs.writeFile('./ExtraDocuments.json', JSON.stringify(docsList), (err) => {
        console.log('Server error from route `/docs/delete`. Error look like', err)
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
