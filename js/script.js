function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then((dataset) => {
    const padding = {
      top: 50,
      right: 40,
      bottom: 120,
      left: 110
    };
    let w;
    let h;

    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset.data, (d) => d.Year));
    const yScale = d3.scaleTime()
      .domain([d3.max(dataset.data, (d) => d3.timeParse('%M:%S')(d.Time)), d3.min(dataset.data, (d) => d3.timeParse('%M:%S')(d.Time))]);
    const svg = d3.select('.graph')
      .append('svg');

    const legendData = [
      {
        doping: true,
        color: '#d24646'
      },
      {
        doping: false,
        color: '#006699'
      }
    ];

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(-10, 40)');

    svg.append('g')
      .attr('class', 'x-axis');

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${padding.left}, 0)`);

    svg.append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -290)
      .attr('y', 40)
      .text('Completion Time (MM:SS)');

    svg.selectAll('circle')
      .data(dataset.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 8)
      .attr('fill', (d) => d.Doping ? '#d24646' : '#006699')
      .attr('stroke', '#fff')
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.graph')
        .append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

      d3.select(this)
        .attr('fill', '#ffbf00');

      tooltip.transition()
        .duration(200)
        .style('visibility', 'visible');

      tooltip.html(`${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping ? d.Doping : 'No doping allegations'}`)
        .style('left', `${d3.select(this).attr('cx') - 80}px`)
        .style('top', `${d3.select(this).attr('cy') - 110}px`);
    }

    function handleMouseout() {
      d3.select(this)
        .attr('fill', (d) => d.Doping ? '#d24646' : '#006699');

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
      .attr('stroke', '#fff');

    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('class', 'legend-label')
      .attr('x', 160)
      .attr('y', (d, i) => i * 24)
      .text(d => d.doping ? 'Doping Allegations' : 'No Doping Allegations')
      .style('font-size', '0.7rem');

    function resize() {
      w = window.innerWidth * 0.9;

      if (w < 800) {
        w = 800;
        h = w * 0.8;
      }
      else {

        if (window.innerWidth < window.innerHeight) {
          h = window.innerHeight * 0.6;
        }
        else {
          h = window.innerHeight * 0.8;
        }
      }

      xScale.range([padding.left, w - padding.right]);
      yScale.range([h - padding.top, padding.bottom]);

      svg.attr('width', w)
        .attr('height', h);

      svg.select('.x-axis')
        .attr('transform', `translate(0, ${h - padding.top})`)
        .call(d3.axisBottom(xScale)
        .tickFormat((d) => d));

      svg.select('.y-axis')
        .call(d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%M:%S')));

      svg.selectAll('.dot')
        .attr('cx', (d) => xScale(d.Year))
        .attr('cy', (d) => yScale(d3.timeParse('%M:%S')(d.Time)));
    }

    resize();

    d3.select(window)
      .on('resize', resize);
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
