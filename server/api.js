const ForgeSDK = require('@arcblock/forge-sdk');

ForgeSDK.connect('https://playground.network.arcblockio.cn/api', { name: 'playground' });
ForgeSDK.connect('https://xenon.abtnetwork.io/api', { name: 'xenon' });
ForgeSDK.connect('https://zinc.abtnetwork.io/api', { name: 'zinc' });

function asyncBatch(tasks) {
  const res = [];
  let count = 0;
  const length = tasks.length;

  return new Promise((resolve) => {
    tasks.forEach(({ runner, responseProcesser }, index) => {
      runner()
        .then((result) => {
          count += 1;

          const { code, data } = responseProcesser(result);
          res[index] = (code !== 'OK' || !data) ? null : data;

          if (count === length) {
            resolve(res);
          }
        })
        .catch((err) => {
          count += 1;
          res[index] = null;

          console.log('request error.', err);

          if (count === length) {
            resolve(res);
          }
        });
    });
  });
}

async function search(key) {
  if (key === null || key === undefined || key === '') return null;

  const asyncMeta = ['account', 'tx', 'asset'];
  const res = await asyncBatch([
    {
      runner: () => ForgeSDK.getAccountState({ address: key }),
      responseProcesser: ({ code, state }) => ({ code, data: state }),
    },
    {
      runner: () => ForgeSDK.getTx({ hash: key }),
      responseProcesser: ({ code, info }) => ({ code, data: info }),
    },
    {
      runner: () => ForgeSDK.getAssetState({ address: key }),
      responseProcesser: ({ code, state }) => ({ code, data: state }),
    },
  ]);

  const resIndex = res.findIndex(it => !!it);

  if (resIndex === -1) return null;

  return {
    type: asyncMeta[resIndex],
    data: res[resIndex],
  }
}

module.exports = (app) => {
  app.get('/api/search', async (req, res) => {
    const result = await search(req.query.key);

    res.jsonp(result);
  });
};

// ForgeSDK.getAccountState({ address: 'zNKoCfRyyDJbYnMnwcLWS5orC2hWfg2xb9Gr' }).then(console.log).catch(console.log);
// ForgeSDK.getTx({ hash: '64B1395CD9E9CE30A502A52CD23C7CB7296D1DCD178E8ECCE5CACFD9F0FA9C63' }).then(console.log).catch(console.log);
// ForgeSDK.getAssetState({ address: 'zjdnd1iw57T5afsLsCoZzDZ92usQMatwzGef' }).then(console.log).catch(console.log);
