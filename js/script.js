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

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -400)
      .attr('y', 30)
      .text('Completion Time (MM:SS)');

    svg.selectAll('circle')
      .data(dataset.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.Year))
      .attr('cy', (d) => yScale(d3.timeParse('%M:%S')(d.Time)))
      .attr('r', 8)
      .attr('fill', (d) => d.Doping ? '#d24646' : '#46d246')
      .attr('stroke', '#522d86')
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.graph')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      d3.select(this)
        .attr('r', 12);

      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(`${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping ? d.Doping : 'No doping allegations'}`)
        .style('left', `${d3.event.pageX + 12}px`)
        .style('top', `${d3.event.pageY - 32}px`);
    }

    function handleMouseout() {
      d3.select(this)
        .attr('r', 8);

      d3.select('.tooltip').remove();
    }

    const legendData = [
      {
        doping: true,
        color: '#d24646'
      },
      {
        doping: false,
        color: '#46d246'
      }
    ];
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(-10, 30)');

    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', w - 200)
      .attr('y', (d, i) => i * 24 - 12)
      .attr('width', 30)
      .attr('height', 15)
      .attr('fill', (d) => d.color)
      .attr('stroke', '#522d86');

    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', w - 160)
      .attr('y', (d, i) => i * 24)
      .text(d => d.doping ? 'Doping Allegations' : 'No Doping Allegations')
      .style('font-size', '0.7rem');
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
