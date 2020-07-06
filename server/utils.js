module.exports.asyncBatch = (tasks, race = false) => {
  const length = tasks.length;
  const responseCache = new Array(length).fill(null);

  let count = 0;

  return new Promise((resolve) => {
    tasks.forEach(({ runner, responseProcesser }, index) => {
      runner()
        .then((result) => {
          count += 1;

          const currentRes = responseProcesser(result);
          responseCache[index] = currentRes;

          if (currentRes && race) {
            resolve(currentRes);
          }

          if (count === length) {
            resolve(race ? null : responseCache);
          }
        })
        .catch((err) => {
          count += 1;

          console.log('request error.', err);

          if (count === length) {
            resolve(race ? null : responseCache);
          }
        });
    });
  });
};
