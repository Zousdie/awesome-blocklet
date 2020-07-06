import React from 'react';
import { Skeleton } from '@material-ui/lab';
import style from './style.module.scss';

const SkeletonComponent = () => (
  <div className={style.skeleton}>
    {new Array(3).fill(undefined).map((it, ix) => (
      <React.Fragment key={ix}>
        <Skeleton variant="text" animation="wave" height={60} style={{ flex: 'none' }} />
        <Skeleton variant="rect" animation="wave" style={{ flex: '40%' }} />
        <Skeleton variant="text" animation="wave" height={60} style={{ flex: 'none' }} />
      </React.Fragment>
    ))}
  </div>
);

export default React.memo(SkeletonComponent);
