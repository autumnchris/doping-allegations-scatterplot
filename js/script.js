function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then((dataset) => {
    const w = 700;
    const h = 500;
    const padding = {
      top: 40,
      right: 30,
      bottom: 100,
      left: 100
    };
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset.data, (d) => d.Year))
      .range([padding.left, w - padding.right]);
    const yScale = d3.scaleTime()
      .domain([d3.max(dataset.data, (d) => d3.timeParse('%M:%S')(d.Time)), d3.min(dataset.data, (d) => d3.timeParse('%M:%S')(d.Time))])
      .range([h - padding.top, padding.bottom]);
    const svg = d3.select('.graph')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${h - padding.top})`)
      .call(d3.axisBottom(xScale)
      .tickFormat((d) => d));

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${padding.left}, 0)`)
      .call(d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat('%M:%S')));

    svg.selectAll('circle')
      .data(dataset.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.Year))
      .attr('cy', (d) => yScale(d3.timeParse('%M:%S')(d.Time)))
      .attr('r', 8)
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => d3.timeParse('%M:%S')(d.Time))
      .attr('fill', (d) => d.Doping ? '#d24646' : '#46d246')
      .attr('stroke', '#522d86');
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
