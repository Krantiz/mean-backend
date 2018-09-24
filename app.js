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
    	"GET, POST, PATCH, DELETE, OPTIONS"
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

app.delete('/api/posts/:postId', (req, res, next) => {
	const logs = Log.deleteOne({ "_id" : req.params.postId })
		.then(
			result => {
				res.status(200).json({message: 'Deleted!'});
			}
		);
});

module.exports = app;