import React from 'react';
import { Typography } from '@material-ui/core';
import style from '../../styles/shared.module.scss';

const AssetCard = (props) => {
  const { data } = props;

  const items = [
    {
      key: 'Address',
      value: data.address,
    },
    {
      key: 'Created At',
      value: data.context.genesisTime,
    },
    {
      key: 'Updated At',
      value: data.context.renaissanceTime,
    },
    {
      key: 'Consumed At',
      value: data.consumedTime || 'NAN',
    },
    {
      key: 'Created By',
      value: data.issuer,
    },
    {
      key: 'Owned By',
      value: data.owner,
    },
    {
      key: 'Readonly?',
      value: data.readonly ? 'YES' : 'NO',
    },
    {
      key: 'Transferable?',
      value: data.transferrable ? 'YES' : 'NO',
    },
  ];

  return (
    <>
      <Typography variant="h4" component="h3" style={{ margin: '8px 0 12px' }}>
        {data.moniker}
      </Typography>

      {items.map((it, ix) => (
        <Typography key={ix} gutterBottom color="textSecondary">
          <span className={style['meta-key']}>{it.key}:</span>
          {it.value}
        </Typography>
      ))}
    </>
  );
};

export default React.memo(AssetCard);
