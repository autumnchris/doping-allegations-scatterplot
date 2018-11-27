function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then((dataset) => {
    const w = 700;
    const h = 500;
    const svg = d3.select('.graph')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
