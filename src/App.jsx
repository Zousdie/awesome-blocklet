import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import style from './app.module.scss';

function App() {
  return (
    <div className={style.container}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
