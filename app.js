const express = require('express');
const app = express();

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


app.use('/api/posts',(req, res, next) => {
	const logs = [
		{id: 'dsasdasds', un: 'aaa', status: 'Present', Remark: 'asdasdasdasda'},
		{id: 'wqeradfdf', un: 'bbb', status: 'Absent', Remark: 'asdasdasdasda'},
		{id: 'vbvzcxzsd', un: 'ccc', status: 'Present', Remark: 'asdasdasdasda'}
	];
	res.status(200).json({
		message: 'fecthed',
		logs: logs
	});
});

module.exports = app;