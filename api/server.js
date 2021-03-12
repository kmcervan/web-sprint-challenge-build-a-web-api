const express = require('express');
const server = express();

//breakpoint variables will go here
const actionRouter = require('../api/actions/actions-router');
const projectRouter = require('../api/projects/projects-router');

server.use(express.json());

//breakpoint connectors will go here
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res)=>{
    res.send(`<h2>Server is aliveeeee!</h2>`)
})

module.exports = server;
