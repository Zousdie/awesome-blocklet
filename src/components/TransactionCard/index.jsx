import React from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
import style from '../../styles/shared.module.scss';

const TransactionCard = (props) => {
  const { data } = props;

  const mainItems = [
    {
      key: 'Sender',
      value: data.tx.from,
    },
    {
      key: 'Receiver',
      value: data.tx.itxJson.to,
    },
    {
      key: 'Delegator',
      value: data.tx.delegator,
    },
  ];

  const detailItems = [
    {
      key: 'Transaction Hash',
      value: data.hash,
    },
    {
      key: 'Block Height',
      value: data.height,
    },
    {
      key: 'Time',
      value: data.time,
    },
    {
      key: 'Index',
      value: data.index,
    },
    {
      key: 'Nonce',
      value: data.tx.nonce,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant="h4" component="h3" style={{ margin: '8px 0 12px' }}>
            Transaction Detail
          </Typography>
          {mainItems.map((it, ix) => (
            <Typography key={ix} gutterBottom color="textSecondary">
              <span className={style['meta-key']}>{it.key}:</span>
              {it.value}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <Chip
            label={data.code === 'OK' ? 'Success' : 'Failed'}
            color={data.code === 'OK' ? 'primary' : 'secondary'}
            style={{ marginBottom: 12 }}
          />
        </Grid>
      </Grid>

      {detailItems.map((it, ix) => (
        <Typography key={ix} gutterBottom color="textSecondary">
          <span className={style['meta-key']}>{it.key}:</span>
          {it.value}
        </Typography>
      ))}
    </>
  );
};

export default React.memo(TransactionCard);
