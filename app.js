const Hapi = require('hapi');

//Init server and add connection
const server = new Hapi.Server();

//Add connection
server.connection({
    port: 4000,
    host: 'localhost'
});

//Home route
server.route({
    method:'GET',
    path:'/',
    handler: (request,reply) => {
        reply('<h1>Hello Hapi</h1>');
    }
});

//Dynamic route
server.route({
    method:'GET',
    path:'/user/{name}',
    handler: (request,reply) => {
        reply('<h1>Hello Hapi/</h1>' + request.params.name);
    }
});

//Static routes
server.register(require('inert'), (err) => {
    if(err) {
        throw err;
    }

    server.route({
        method:'GET',
        path:'/about',
        handler: (request, reply) => {
            return reply.file(`./public/about.html`);
        }
    });
})

//Start server
server.start((err) => {
    if(err) {
        throw err;
    }

    console.log(`Server started at: ${server.info.uri}`);
});