const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Log = require('./models/log');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  	res.setHeader("Access-Control-Allow-Origin", "*");
  	res.setHeader(
    	"Access-Control-Allow-Headers",
    		"Origin, X-Requested-With, Content-Type, Accept"
  	);
  	res.setHeader(
    	"Access-Control-Allow-Methods",
    	"GET, POST, PUT, DELETE, OPTIONS"
  	);
  	next();
});

app.post('/api/posts', (req, res, next) => {
	// const post = req.body;
	const logger = new Log({
		un: req.body.un,
		status: req.body.status,
		remark: req.body.remark
	});
	logger.save().then(createdPostId => {
		res.status(201).json({
	    	message: 'Post added successfully',
	    	postId: createdPostId._id
	  	});
	});
  	// console.log(logger);
});

app.put('/api/posts/:id', (req, res, next) => {
	// console.log('asdasdas');
	const logger = new Log({
		_id: req.body.id,
		un: req.body.un,
		status: req.body.status,
		remark: req.body.remark
	});
	// console.log(req);
	// console.log(logger);

	Log.updateOne({ "_id" : req.params.id }, logger)
		.then(
			result => {
				// console.log(result);
				res.status(200).json({message: 'Updated!'});
			}
		);
});

app.get('/api/posts', (req, res, next) => {
	// const logs = [
	// 	{id: 'dsasdasds', un: 'aaa', status: 'Present', Remark: 'asdasdasdasda'},
	// 	{id: 'wqeradfdf', un: 'bbb', status: 'Absent', Remark: 'asdasdasdasda'},
	// 	{id: 'vbvzcxzsd', un: 'ccc', status: 'Present', Remark: 'asdasdasdasda'}
	// ];

	const logs = Log.find()
		.then(documents => {
			res.status(200).json({
				message: 'fecthed',
				logs: documents
			});
		});
	
});

app.get('/api/posts/:id', (req, res, next) => {
	Log.findById(req.params.id)
		.then(document => {
			if (document) {
				res.status(200).json(document);
			} else {
				res.status(200).json({message: 'Not Found!'});
			}
		});
	
});

app.delete('/api/posts/:postId', (req, res, next) => {
	const logs = Log.deleteOne({ "_id" : req.params.postId })
		.then(
			result => {
				res.status(200).json({message: 'Deleted!'});
			}
		);
});

module.exports = app;