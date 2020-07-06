import React from 'react';
import queryString from 'query-string';
import { Snackbar } from '@material-ui/core';
import Skeleton from './Skeleton';
import Content from './Content';
import style from './style.module.scss';

const Main = (props) => {
  const { query } = props;

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const lastFetchId = React.useRef(0);

  React.useEffect(() => {
    if (!query) return;

    const params = queryString.stringify({ key: query });

    lastFetchId.current += 1;
    const id = lastFetchId.current;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?${params}`).then((r) => r.json());

        if (id !== lastFetchId.current) {
          return;
        }

        setData(res);
      } catch {
        setOpen(true);
      } finally {
        if (id !== lastFetchId.current) {
          return;
        }

        setLoading(false);
      }
    })();
  }, [query]);

  return (
    <main className={style.container}>
      {query ? (
        loading ? (
          <Skeleton />
        ) : (
          <Content value={data} />
        )
      ) : (
        <h4 style={{ textAlign: 'center' }}>Enter search keywords...</h4>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="Fetch ERROR!"
      />
    </main>
  );
};

export default React.memo(Main);
