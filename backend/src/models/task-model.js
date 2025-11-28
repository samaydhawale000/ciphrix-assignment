const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        require: true,
        enum:['pending', 'completed']
    }
}, {
    timestamps: true, 
    strict: false
});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;