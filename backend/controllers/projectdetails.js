const _ = require('lodash');
const { ObjectId } = require('mongodb');
const { Projectdetails, validate } = require('../models/projectdetails');
const mongoose = require('mongoose');
const { json } = require('body-parser');

exports.createProjectDetails = (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else
    // Insert the new project if the name is not taken yet
    projectdetails = new Projectdetails(_.pick(req.body, ['userid','projectid','stakeholder', 'fairnesscard', 'goright', 'gowrong']));
    projectdetails.save();
    res.status(200).send(projectdetails._id)
}

exports.insertExtra = (req, res) => {
    Projectdetails.find((error, projectdetails) => {
        if (error)
            return next(error)
        else {
            for(var i=0; i<projectdetails.length; i++){
            if(projectdetails[i].userid == req.body.userid && projectdetails[i].projectid == req.body.projectid) {
                console.log(projectdetails[i])
                console.log(req.body)
                projectdetails[i].fairnesscard = projectdetails[i].fairnesscard + ',' + req.body.fairnesscard;
                projectdetails[i].goright = projectdetails[i].goright + ',' + req.body.goright;
                projectdetails[i].gowrong = projectdetails[i].gowrong + ',' + req.body.gowrong;
                projectdetails = projectdetails[i]

            }
        }
        projectdetails.save((error, updatedProjectdetails) => {
            //Wrong input
            if(error) 
                return res.status(400).end();
            return res.status(200).json(updatedProjectdetails);
        })
        }
    })
}