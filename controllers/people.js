const Person = require('../models/person');

exports.index = async (req, res, next) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        res.status(200).json(person);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const {name, age, likesBacon} = req.body;
        const pers = await Person.create({
            name,
            age,
            likesBacon
        });
        res.status(200).json({message: 'Person was created successfully', status: 'success', person: pers});
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const params = req.body;
        const pers = await Person.findOneAndUpdate(params);
        res.status(200).json({message: 'Person was updated successfully', status: 'success', person: pers});
    } catch (error) {
        next(error);
    }
};

exports.destroy = async (req, res, next) => {
    try {
        const {id} = req.body;
        await Person.destroy({id});
        res.status(200).json({message: 'Person was deleted successfully', status: 'success'});
    } catch (error) {
        next(error);
    }
};

exports.reset = async (req, res, next) => {
    try {
        await Person.reset();
        res.status(200).json({message: 'Person list reset', status: 'success'});
    } catch (error) {
        next(error);
    }
};