const mongoose = require('mongoose');

const UserDefineSchema = new mongoose.Schema({
    // key: {
    //     type: String,
    //     required: true,
    // },
    // valueType: {
    //     type: String,
    //     required: true,
    // },
    // isRequired: {
    //     type: Boolean,
    //     default: false,
    // },
    // isUnique: {
    //     type: Boolean,
    //     default: false,
    // },
    // isRef: {
    //     type: Boolean,
    //     default: false,
    // },
    // refModel: {
    //     type: String,
    //     default: '',
    // },
    name: {
        type: String,
        required: true,
    },
    properties: {
        type: Array,
        default: [],
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
},{
    timestamps: true,
});


const UserDefine = mongoose.model('UserDefine', UserDefineSchema);

module.exports = UserDefine;