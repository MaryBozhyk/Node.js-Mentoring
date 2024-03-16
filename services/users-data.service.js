const users = require('../data/users.json');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const {updateFileData} = require('../shared/write-data-to-file');

function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
};

function findUserById(userId) {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === userId);

        resolve(user);
    });
}

function addNewUser(user) {
    return new Promise((resolve, reject) => {
        const newUser = {
            ...user,
            id: uuidv4(),
            hobbies: []
        }
        users.push(newUser);

        updateFileData(path.join(__dirname, '../data', 'users.json'), users);

        resolve(newUser);
    });
}

function addHobbies(newHobbies, user) {
    return new Promise((resolve, reject) => {
        newHobbies.forEach(newHobby => {
            const hobbyExists = user.hobbies.some(hobby => hobby === newHobby);

            if (!hobbyExists) {
                user.hobbies.push(newHobby);
            }
        })

        updateFileData(path.join(__dirname, '../data', 'users.json'), users);

        resolve(user);
    });
}

function deleteUserById(userId) {
    return new Promise((resolve, reject) => {
        const userIndex = users.findIndex(user => user.id === userId);

        users.splice(userIndex, 1);

        updateFileData(path.join(__dirname, '../data', 'users.json'), users);

        resolve(true)
    });
}

module.exports = {
    findAllUsers,
    findUserById,
    addNewUser,
    addHobbies,
    deleteUserById
}