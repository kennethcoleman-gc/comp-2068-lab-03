let peopleData = require('../data/people');
const nextFreeIdData = require('../data/next_free_id');
const peopleDataPath = './data/people.json';
const nextIdDataWritePath = './data/next_free_id.json';

exports.find = () => {
    return peopleData;
};

exports.findById = (id) => {
    for (let person of peopleData) {
        if (person.id === Number(id)) return person;
    }

    let e = new Error(`id ${id} does not exist.`);
    e.statusCode = 404;
    throw e;
};

exports.create = ({name, age, likesBacon}) => {
    let id = nextFreeIdData.nextFreeId;
    age = Number(age);
    likesBacon = Boolean(likesBacon);

    let peopleArray = [];
    peopleArray = peopleData;

    peopleArray.push({id, name, age, likesBacon});

    writeArrayToJSON(peopleDataPath, peopleArray);
    writeNextIdToJSON(nextIdDataWritePath, id);

    return peopleArray[peopleArray.length - 1];
};

exports.findOneAndUpdate = (params) => {
    let peopleArray = [];
    peopleArray = peopleData;

    if(!params.id) {
        let e = new Error("id must be provided");
        e.statusCode = 422;
        throw e;
    }

    let id = Number.parseInt(params.id);

    let personToChangeIndex = peopleArray.findIndex((element) => {
            return element.id === id;
        }
    );

    if(personToChangeIndex === -1){
        let e = new Error(`id ${id} does not exist.`);
        e.statusCode = 404;
        throw e;
    }

    if(params.name) peopleArray[personToChangeIndex].name = params.name;
    if(params.age) peopleArray[personToChangeIndex].age = Number.parseInt(params.age);
    if(params.likesBacon){
        let normalizedLikesBacon = params.likesBacon.trim().toLowerCase();
        if(normalizedLikesBacon === 'true') peopleArray[personToChangeIndex].likesBacon = true;
        if(normalizedLikesBacon === 'false') peopleArray[personToChangeIndex].likesBacon =false;
    }

    writeArrayToJSON(peopleDataPath, peopleArray);

    return peopleArray[personToChangeIndex];
};


exports.destroy = ({id}) => {
    id = Number.parseInt(id);

    let peopleArray = [];
    peopleArray = peopleData;

    let foundIndex = peopleArray.findIndex((element) => {
            return element.id === id;
        }
    );

    if (foundIndex !== -1) {
        peopleArray.splice(foundIndex, 1);
        writeArrayToJSON(peopleDataPath, peopleArray);
        return true;
    }

    let e = new Error(`id ${id} does not exist.`);
    e.statusCode = 404;
    throw e;
};

exports.reset = () => {
    const peopleDataBackup = require('../data/people-backup');
    const nextFreeIdBackupData = require('../data/next_free_id_backup');

    writeArrayToJSON(peopleDataPath, peopleDataBackup);
    writeNextIdToJSON(nextIdDataWritePath, nextFreeIdBackupData.nextFreeId - 1);
};

function writeArrayToJSON(path, array) {
    const fs = require('fs');
    fs.writeFile(path, JSON.stringify(array, null, 2), function (err) {
        if (err) throw err;
    });
}

function writeNextIdToJSON(path, currentId) {
    const fs = require('fs');
    fs.writeFile(path, `{"nextFreeId": ${currentId + 1}}`, function (err) {
        if (err) throw err;
    });
}