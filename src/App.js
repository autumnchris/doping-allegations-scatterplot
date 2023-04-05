import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import Header from './components/Header';
import Footer from './components/Footer';
import Scatterplot from './components/Scatterplot';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [dopingData, setDopingData] = useState([]);

  useEffect(() => {
    json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(dataset => {
      setLoadingStatus(false);
      setDopingData(dataset);

    }).catch(() => {
      setLoadingStatus(false);
      setDopingData([]);
    });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main>
        {loadingStatus && dopingData.length === 0 ? <LoadingSpinner /> : dopingData.length !== 0 ? <Scatterplot dopingData={dopingData} /> : <ErrorMessage />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
