function displayGraph() {
  const margin = {
    top: 50,
    right: 40,
    bottom: 120,
    left: 110
  };
  const w = 800;
  const h = w * 0.6;
  const legendData = [
    {
      doping: true,
      color: '#e18484'
    },
    {
      doping: false,
      color: '#4ddbff'
    }
  ];

  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(dataset => {
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, (d) => d.Year))
      .range([margin.left, w - margin.right]);
    const yScale = d3.scaleTime()
      .domain([d3.max(dataset, (d) => d3.timeParse('%M:%S')(d.Time)), d3.min(dataset, (d) => d3.timeParse('%M:%S')(d.Time))])
      .range([h - margin.top, margin.bottom]);

    const svg = d3.select('.graph')
      .append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`);

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(-10, 40)');

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${h - margin.top})`)
      .call(d3.axisBottom(xScale)
      .tickFormat((d) => d));

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat('%M:%S')));

    svg.append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -290)
      .attr('y', 40)
      .attr('fill', '#fff')
      .text('Completion Time (MM:SS)');

    svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 5)
      .attr('cx', (d) => xScale(d.Year))
      .attr('cy', (d) => yScale(d3.timeParse('%M:%S')(d.Time)))
      .attr('fill', d => d.Doping ? '#e18484' : '#4ddbff')
      .attr('stroke', '#333')
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.graph')
        .append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

      d3.select(this)
        .attr('r', 8);

      tooltip.transition()
        .duration(200)
        .style('visibility', 'visible');

      tooltip.html(`${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping ? d.Doping : 'No doping allegations'}`)
        .style('left', `${d3.event.pageX - 50}px`)
        .style('top', `${d3.event.pageY - 100}px`);
    }

    function handleMouseout() {
      d3.select(this)
        .attr('r', 5);

      d3.select('.tooltip').remove();
    }

    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('class', 'legend-color')
      .attr('x', 120)
      .attr('y', (d, i) => i * 24 - 12)
      .attr('width', 30)
      .attr('height', 15)
      .attr('fill', (d) => d.color)
      .attr('stroke', '#333');

    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('class', 'legend-label')
      .attr('x', 160)
      .attr('y', (d, i) => i * 24)
      .attr('fill', '#fff')
      .text(d => d.doping ? 'Doping Allegations' : 'No Doping Allegations')
      .style('font-size', '0.7rem');
  }).catch(err => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
