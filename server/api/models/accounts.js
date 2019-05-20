const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    number: { type: String, required: false },
    previous_balance: { type: Number, required: false },
    new_balance: { type: Number, required: false },
    minimum: { type: Number, required: false },
    datedue: { type: Number, required: false },
    interest: { type: Number, required: false },
    limit: { type: Number, required: false },
    debttype: { type: String, required: false },
    purchases: { type: Number, required: false },
    payment: { type: Number, required: false },
    statement_date: { type: Date, default: Date.now },
    owner: { type: String, required: true },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);