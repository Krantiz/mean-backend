const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	un: { type: String, required: true},
	status: { type: String, required: true},
	remark: { type: String, required: false}
});

mongoose.model('Log', logSchema);