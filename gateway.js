const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'core', url: 'http://localhost:4001' },
    { name: 'interviewq', url: 'http://localhost:4002' },
    { name: 'resumeq', url: 'http://localhost:4003' },
  ],
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  const port = process.env.PORT || 4000;

  server.listen(port, () =>
    console.log(`\n** Gateway server listening on port ${port} **\n`),
  );
})();
