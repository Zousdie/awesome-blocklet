module.exports.asyncBatch = (tasks) => {
  let count = 0;
  const length = tasks.length;

  return new Promise((resolve) => {
    tasks.forEach(({ runner, responseProcesser }, index) => {
      runner()
        .then((result) => {
          count += 1;

          const currentRes = responseProcesser(result);

          if (currentRes) {
            resolve(currentRes);
          }

          if (count === length) {
            resolve(null);
          }
        })
        .catch((err) => {
          count += 1;

          console.log('request error.', err);

          if (count === length) {
            resolve(null);
          }
        });
    });
  });
};
