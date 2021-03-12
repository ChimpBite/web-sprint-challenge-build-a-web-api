const server = require('./api/server');

const actionsRouter = require('./api/actions/actions-router');

server.use(actionsRouter);
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`listening on port ${port} , running at http://localhost:${port}`)
})
