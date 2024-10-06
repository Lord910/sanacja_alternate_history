// d3-barchart.js

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barchart")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Data
var data = [
    {group: "repairers", value: Q.repairers_strength},
    {group: "liberals", value: Q.liberals_strength},
    {group: "sanacja_left", value: Q.sanacja_left_strength},
    {group: "conservatives", value: Q.conservatives_strength},
    {group: "fourth_brigade", value: Q.fourth_brigade_strength}
];

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.group; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 25])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", "#69b3a2");