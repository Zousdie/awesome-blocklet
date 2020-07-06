const GraphQLClient = require('@arcblock/graphql-client');
const { asyncBatch } = require('./utils');

const chains = [
  {
    name: 'playground',
    client: new GraphQLClient('https://playground.network.arcblockio.cn/api'),
  },
  {
    name: 'xenon-2020-01-15',
    client: new GraphQLClient('https://xenon.abtnetwork.io/api'),
  },
  {
    name: 'zinc-2019-05-17',
    client: new GraphQLClient('https://zinc.abtnetwork.io/api'),
  },
];

function search(key) {
  if (key === null || key === undefined || key === '') return null;

  const tasks = [];

  chains.forEach(({ name, client }) => {
    tasks.push(
      ...[
        {
          runner: () => client.getAccountState({ address: key }),
          responseProcesser: ({ code, state }) =>
            code === 'OK' && state
              ? {
                  chain: name,
                  type: 'account',
                  data: state,
                }
              : null,
        },
        {
          runner: () => client.getAssetState({ address: key }),
          responseProcesser: ({ code, state }) =>
            code === 'OK' && state
              ? {
                  chain: name,
                  type: 'asset',
                  data: state,
                }
              : null,
        },
        {
          runner: () => client.getTx({ hash: key }),
          responseProcesser: ({ code, info }) =>
            code === 'OK' && info
              ? {
                  chain: name,
                  type: 'tx',
                  data: info,
                }
              : null,
        },
      ],
    );
  });

  return asyncBatch(tasks);
}

module.exports = (app) => {
  app.get('/api/search', async (req, res) => {
    const result = await search(req.query.key);

    res.jsonp(result.filter((it) => !!it));
  });
};
