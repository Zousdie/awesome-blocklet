import React from 'react';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash-es';
import style from './style.module.scss';

const Header = (props) => {
  const { onSearch } = props;

  const delayedQuery = React.useCallback(
    debounce((q) => {
      if (typeof onSearch === 'function') {
        onSearch(q);
      }
    }, 300),
    [onSearch],
  );

  const handleInputChage = React.useCallback(
    (event) => {
      delayedQuery(event.target.value);
    },
    [delayedQuery],
  );

  return (
    <header className={style.container}>
      <div className={style.logo}>
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="52" viewBox="0 0 45 52">
          <g fill="none" fillRule="evenodd" stroke="#000">
            <path d="M.5 13.077L22.15.577l21.651 12.5v25l-21.65 12.5L.5 38.077zM22.15.577v50M.5 13.077l43.301 25m-43.301 0l43.301-25" />
            <path d="M22.15 38.077l10.826-6.25-10.825-18.75-10.825 18.75z" />
          </g>
        </svg>
        <h3>Awesome Explorer</h3>
      </div>

      <TextField
        autoFocus
        variant="outlined"
        label="search"
        size="small"
        placeholder="Account/Asset/Transaction"
        style={{ width: '50%', maxWidth: 600 }}
        onChange={handleInputChage}
      />
    </header>
  );
};

export default React.memo(Header);
