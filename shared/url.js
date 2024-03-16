const userHobbiesPattern = /\/api\/users\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}\/hobbies/u;
const deleteUserPattern = /\/api\/users\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/u;
const uuidPattern = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
const users = '/api/users';

function getIdFromUrl(url) {
    return url.match(uuidPattern)[ 0 ];
}

module.exports = {
    userHobbiesPattern,
    deleteUserPattern,
    users,
    getIdFromUrl
}