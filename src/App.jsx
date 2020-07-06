import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import style from './styles/app.module.scss';

function App() {
  const [query, setQuery] = React.useState('');

  return (
    <div className={style.container}>
      <Header onSearch={setQuery} />
      <Main query={query} />
    </div>
  );
}

export default App;
