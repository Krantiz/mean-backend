const mocha = require('mocha');
const assert = require('assert');
const Log = require('../models/log');
const mongoose = require('mongoose');


// Describing the test
describe('Test Name', function(done) {
	
	//Test
	it('Saving Data', function(){
		// DB connection
		mongoose.connect("mongodb://localhost:27017/TestDB", { useNewUrlParser: true });
		mongoose.connection.once('open', function() {
			console.log('MongoDB connected!!!!');
		}).on('error', function(){
		console.log('connection error:', error);
		});

		// Saving Data
		var logger = new Log({
			un: 'kranti',
			status: 'present',
			remark: 'sdfsadkfasf'
		});

		logger.save().then(function(){
			assert(logger.isNew === false);
			done(); 
		})
		assert(2 + 3 === 5);
	});
});