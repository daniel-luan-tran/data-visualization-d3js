async function draw() {
  // Data
  const dataset = await d3.csv('data.csv')

  const parseDate = d3.timeParse('%Y-%m-%d');

  // const xAccessor = d => d.date
  const xAccessor = d => parseDate(d.date)
  const yAccessor = d => parseInt(d.close)

  // Dimensions
  let dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const ctr = svg.append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice()

  const xScale = d3.scaleUtc()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])
  
  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));

  ctr.append("path")
    .datum(dataset)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "red")

  // Axes
  const xAxis = d3.axisBottom(xScale)
    .ticks(5)
  // .tickFormat(d => `${d*100}%`);
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => `$${d}`);

  const xAxisGroup = ctr.append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  xAxisGroup.append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margins - 10)
    .attr("fill", "black")
    .text("Date");

  const yAxisGroup = ctr.append("g")
    .call(yAxis)
    .classed("axis", true);

  yAxisGroup.append("text")
    .attr("x", - dimensions.ctrHeight / 2)
    .attr("y", dimensions.margins - 85)
    .attr("fill", "black")
    .html("Close")
    .style("transform", "rotate(270deg")
    .style("text-anchor", "middle");

  // console.log(lineGenerator(dataset))
}

draw()