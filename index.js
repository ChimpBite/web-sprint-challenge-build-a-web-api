const server = require('./api/server');

const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

server.use(actionsRouter);
server.use(projectsRouter);
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`listening on port ${port} , running at http://localhost:${port}`)
})
