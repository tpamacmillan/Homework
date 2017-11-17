/**
Timothy Macmillan Data Processing Week 3

This uses the data in data.json to create a barchart with D3
on the html page.
**/

// Set the margins and the dimensions of the chart
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// Set the ranges in the x an y directions
var x = d3.scale.ordinal().rangeBands([0, width], 0.1);
var y = d3.scale.linear().range([height, 0]);

// Define the x and y Axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// Add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Load the dataset from the JSON
d3.json("data.json", function(error, data) {
    data.forEach(function(d) {
        d.day = d.day;
        d.temp = +(d.temp/10);
    });
  
  // Scales the domain for x an y directions from the dataset
  x.domain(data.map(function(d) { return d.day; }));
  y.domain([0, d3.max(data, function(d) { return d.temp; })]);

  // Add x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  // Add y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", "-3em")
      .style("text-anchor", "end")
      .text("Temperature ->");

  // Add bars using dataset
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.day); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.temp); })
      .attr("height", function(d) { return height - y(d.temp); });
});
