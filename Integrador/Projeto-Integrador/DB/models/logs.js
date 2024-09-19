const mongoose = require('mongoose');

const logs = mongoose.model('log_portas',{
    horario: { type: Date, default: Date.now },
    door: String,
    user: String,
    action: String

});

module.exports = logs;