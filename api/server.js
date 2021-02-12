const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');
const mw = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res)=> {
    res.send(`<h2>The API Lives to fight another day XD</h2>`)
}); 

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
