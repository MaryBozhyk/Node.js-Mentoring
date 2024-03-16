const {parseRequestBody} = require('../shared/body');
const {
    findAllUsers,
    findUserById,
    addNewUser,
    addHobbies,
    deleteUserById
} = require('./users-data.service');
const {
    createGetUsersResponse,
    createGetUserFailedResponse,
    createGetHobbiesSuccessResponse,
    createGetUserSuccessResponse,
    createDeleteUserSuccessResponse
} = require('./users-response.service');

// @desc Get all users
// @desc GET /api/users
async function getAllUsers(req, res) {
    try {
        const usersData = await findAllUsers();
        const responseData = createGetUsersResponse(usersData);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.end(JSON.stringify(responseData));
    }
    catch (error) {
        console.error(error);
    }
}

// @desc Get hobbies
// @desc GET /api/users/:userId/hobbies
async function getHobbies(req, res, userId) {
    try {
        const user = await findUserById(userId);

        if (!user) {
            const responseData = createGetUserFailedResponse(userId);

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responseData));
        } else {
            const responseData = createGetHobbiesSuccessResponse(user);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'private, max-age=3600');
            res.end(JSON.stringify(responseData));
        }
    }
    catch (error) {
        console.error(error);
    }
}

// @desc Create new user
// @desc POST /api/users
async function createNewUser(req, res) {
    try {
        const user = await parseRequestBody(req);
        const newUser = await addNewUser(user);
        const responseData = createGetUserSuccessResponse(newUser);

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
    }
    catch (error) {
        console.error(error);
    }
}

// @desc Update hobbies
// @desc PATCH /api/users/:userId/hobbies
async function updateHobbies(req, res, userId) {
    try {
        const user = await findUserById(userId);

        if (!user) {
            const responseData = createGetUserFailedResponse(userId);

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responseData));
        } else {
            const body = await parseRequestBody(req);
            const newHobbies = body.hobbies;
            const updatedUser = await addHobbies(newHobbies, user);
            const responseData = createGetUserSuccessResponse(updatedUser);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responseData));
        }
    }
    catch (error) {
        console.error(error);
    }
}

// @desc Delete user
// @desc DELETE /api/users/:userId
async function deleteUser(req, res, userId) {
    try {
        const user = await findUserById(userId);

        if (!user) {
            const responseData = createGetUserFailedResponse(userId);

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responseData));
        } else {
            await deleteUserById(userId);

            const responseData = createDeleteUserSuccessResponse();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responseData));
        }
    }
    catch (error) {
        console.error(error);
    }
}


module.exports = {
    getAllUsers,
    getHobbies,
    createNewUser,
    updateHobbies,
    deleteUser
}