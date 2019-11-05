const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'core', url: 'https://qh-core-practice-01.herokuapp.com' },
    {
      name: 'interviewq',
      url: 'https://qh-interviewq-practice-01.herokuapp.com/',
    },
    { name: 'resumeq', url: 'https://qh-resumeq-practice-01.herokuapp.com/' },
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
