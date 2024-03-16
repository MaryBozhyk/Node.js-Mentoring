function createGetUsersResponse(users) {
    return {
        data: getUsersData(users),
        error: null
    }
}

function createGetUserFailedResponse(userId) {
    return {
        data: null,
        error: `User with id ${userId} doesn't exist`
    }
}

function createGetHobbiesSuccessResponse(user) {
    return {
        data: getHobbiesData(user),
        error: null
    }
}

function createGetUserSuccessResponse(user) {
    return {
        data: getUserData(user),
        error: null
    }
}

function createDeleteUserSuccessResponse() {
    return {
        data: {
            success: true
        },
        error: null
    }
}

function getUsersData(users) {
    return users.map(user => getUserData(user));
}

function getUserData(user) {
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        links: {
            self: `/api/users/${user.id}`,
            hobbies: `/api/users/${user.id}/hobbies`
        }
    }
}

function getHobbiesData(user) {
    return {
        hobbies: user.hobbies || [],
        links: {
            self: `/api/users/${user.id}/hobbies`,
            user: `/api/users/${user.id}`
        }
    }
}

module.exports = {
    createGetUsersResponse,
    createGetUserFailedResponse,
    createGetHobbiesSuccessResponse,
    createGetUserSuccessResponse,
    createDeleteUserSuccessResponse
}