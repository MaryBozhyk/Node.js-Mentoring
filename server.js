const http = require('http');
const {
    getAllUsers,
    getHobbies,
    createNewUser,
    updateHobbies,
    deleteUser
} = require('./services/users-api.service');
const url = require('./shared/url');
const port = 8000;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url === url.users) {
                getAllUsers(req, res);
                break
            }
            if (url.userHobbiesPattern.test(req.url)) {
                const userId = url.getIdFromUrl(req.url);

                getHobbies(req, res, userId);
                break
            }
        case 'POST':
            if (req.url === url.users) {
                createNewUser(req, res);
                break
            }
        case 'PATCH':
            if (url.userHobbiesPattern.test(req.url)) {
                const userId = url.getIdFromUrl(req.url);

                updateHobbies(req, res, userId);
                break;
            }
        case 'DELETE':
            if (url.deleteUserPattern.test(req.url)) {
                const userId = url.getIdFromUrl(req.url);

                deleteUser(req, res, userId);
                break;
            }
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Not valid api');
    }
});

server.listen(port, () => {`The srever is starting on port ${port}`});