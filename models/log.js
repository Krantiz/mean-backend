const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	un: { type: String, required: true},
	status: { type: String, required: true},
	remark: { type: String, required: false}
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;