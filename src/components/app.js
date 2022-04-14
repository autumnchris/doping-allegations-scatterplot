import React from 'react';
import Scatterplot from './scatterplot';

const App = () => {
  return (
    <React.Fragment>
      <header>
        <h1>Doping by Professional Cyclists</h1>
        <h2>35 Fastest Times up Alpe d'Huez</h2>
      </header>
      <main>
        <Scatterplot />
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;