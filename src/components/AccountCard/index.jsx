import React from 'react';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import style from '../../styles/shared.module.scss';

const AccountCard = (props) => {
  const { data } = props;

  const metaKeyClassName = style['meta-key'];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Typography variant="h4" component="h3" style={{ margin: '8px 0 12px' }}>
            {data.moniker}
          </Typography>
          <Typography gutterBottom color="textSecondary">
            <span className={metaKeyClassName}>Address:</span>
            {data.address}
          </Typography>
          <Typography gutterBottom color="textSecondary">
            <span className={metaKeyClassName}>First Seen:</span>
            {data.context.genesisTime}
          </Typography>
          <Typography gutterBottom color="textSecondary">
            <span className={metaKeyClassName}>Last Seen:</span>
            {data.context.renaissanceTime}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography align="right" color="textPrimary" variant="h4" style={{ margin: '5% 0 8px' }}>
            {data.balance}
          </Typography>
          <Typography align="right" color="textSecondary" variant="body2">
            Balance
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" variant="h6" style={{ lineHeight: 2.5 }}>
                {data.numTxs}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                valid txs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" variant="h6" style={{ lineHeight: 2.5 }}>
                {data.numAssets}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                assets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" variant="h6" style={{ lineHeight: 2.5 }}>
                {data.stake?.totalStakes}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                stakes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" variant="h6" style={{ lineHeight: 2.5 }}>
                {data.stake?.totalReceivedStakes}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                received stakes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(AccountCard);
