import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import Scatterplot from './Scatterplot';
import LoadingSpinner from './Loading-Spinner';
import ErrorMessage from './Error-Message';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [dopingData, setDopingData] = useState([]);

  useEffect(() => {
    json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(dataset => {
      setLoadingStatus(false);
      setLoadSuccess(true);
      setDopingData(dataset);

    }).catch(() => {
      setLoadingStatus(false);
      setLoadSuccess(false);
      setDopingData([]);
    });
  }, []);

  return (
    <React.Fragment>
      <header>
        <h1>Doping by Professional Cyclists</h1>
        <h2>35 Fastest Times up Alpe d'Huez</h2>
      </header>
      <main>
        {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <Scatterplot dopingData={dopingData} /> : <ErrorMessage />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
