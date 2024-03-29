const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');
const moment = require('moment');

const Project = mongoose.model('Project', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    appscenario:{
        type: String,
        required: true
    },
    apptype:{
        type: Number,
        required: true
    },
    invitedmembers:{
        type: Array,
        required: true
    },
    numinvitedmembers:{
        type: Number,
    },
    acceptedmembers: {
        type: Array
    },
    rejectedmembers: {
        type: Array
    },
    inputtedmembers: {
        type: Array
    },
    reviewedmembers: {
        type: Array
    },
    message: {
        type:String,
        default: "No Message"
    },
    facilitator: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: '0'
    },
    deadline: {
        type: String
    },
    mincards: {
        type: Number,
        default: '10'
    },
    minreviews:{
        type: Number
    },
    createdate: {
        type: String,
        default: () => moment().format("YYYY-MM-DD")
    }
}))

const validateProject = function (project) {
    const schema = Joi.object({
        name: Joi.string().required(),
        appscenario: Joi.string().required(),
        apptype: Joi.number().required(),
        invitedmembers: Joi.array().required(),
        numinvitedmembers: Joi.array(),
        acceptedmembers: Joi.array(),
        rejectedmembers: Joi.array(),
        inputtedmembers: Joi.array(),
        message: Joi.string().allow(''),
        facilitator: Joi.string().required(),
        progress: Joi.number(),
        deadline: Joi.string(),
        mincards: Joi.number(),
        minreviews: Joi.number(),
        createdate: Joi.string()
    });
    return schema.validate(project);
}

exports.Project = Project;
exports.validate = validateProject;