// Data for the bar chart
const data = [30, 86, 168, 281, 303, 365];

// SVG settings
const svg = d3.select("#internal_factions");
const width = +svg.attr("width");
const height = +svg.attr("height");
const barWidth = width / data.length;

// Height scale
const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

// Adding bars
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * barWidth)
    .attr("y", d => y(d))
    .attr("width", barWidth - 1)
    .attr("height", d => height - y(d));

// Adding the y-axis
const yAxis = d3.axisLeft(y).ticks(5);
svg.append("g")
    .attr("class", "axis-label")
    .attr("transform", "translate(30,0)")
    .call(yAxis);