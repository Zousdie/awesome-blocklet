import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import AccountCard from '../AccountCard';
import AssetCard from '../AssetCard';
import TransactionCard from '../TransactionCard';
import style from './style.module.scss';

const ContentCards = {
  account: AccountCard,
  asset: AssetCard,
  tx: TransactionCard,
};

const Content = (props) => {
  const { value } = props;

  if (!value.length) {
    return <h4 style={{ textAlign: 'center' }}>No matching content found...</h4>;
  }

  return (
    <>
      {value.map((it) => {
        const { chain, type, data } = it;
        const ContentCard = ContentCards[type];

        return (
          <Card className={style.content}>
            <CardContent>
              <Typography gutterBottom color="textSecondary">
                Chain: {chain}
              </Typography>

              <Typography gutterBottom color="textSecondary">
                Hit Type: {type}
              </Typography>

              {ContentCard && data ? <ContentCard data={data} /> : <div>Invalid data...</div>}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default React.memo(Content);
