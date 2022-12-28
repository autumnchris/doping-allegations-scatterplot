import React, { useState, useEffect } from 'react';
import { json, select } from 'd3';
import Scatterplot from './Scatterplot';
import LoadingSpinner from './Loading-Spinner';
import ErrorMessage from './Error-Message';
import Tooltip from './Tooltip';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [dopingData, setDopingData] = useState([]);
  const [tooltip, setTooltip] = useState(null);

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

  function handleMouseEnter(event, value) {
    setTooltip({
      name: value.Name,
      nationality: value.Nationality,
      year: value.Year,
      time: value.Time,
      allegation: value.Doping,
      left: `${(event.pageX - 53)}px`,
      top: `${(event.pageY + 25)}px`
    });

    select(event.currentTarget)
      .attr('r', 8);
  }

  function handleMouseLeave(event) {
    setTooltip(null);

    select(event.currentTarget)
      .attr('r', 5);
  }

  return (
    <React.Fragment>
      <header>
        <h1>Doping by Professional Cyclists</h1>
        <h2>35 Fastest Times up Alpe d'Huez</h2>
      </header>
      <main>
        {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <Scatterplot dopingData={dopingData} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} /> : <ErrorMessage />}
        {tooltip && <Tooltip tooltip={tooltip} />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
