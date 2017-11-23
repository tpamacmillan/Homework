/**
Timothy Macmillan Data Processing Week 4

tooltip help: https://stackoverflow.com/questions/16256454/d3-js-position-tooltips-using-element-position-not-mouse-position
**/

// Set the margins and the dimensions of the chart
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// Set the ranges in the x an y directions
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Uses standard colors for the circles
var color = d3.scale.category10();

// Define the x and y Axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

// Define div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

// Add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the dataset from the JSON
d3.csv("premdata.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.diff = +d.diff;
      d.points = +d.points;
    });
  
  // Scales the domain for x an y directions from the dataset
    x.domain(d3.extent(data, function(d) { return d.diff; })).nice();
    y.domain(d3.extent(data, function(d) { return d.points; })).nice();

  // Add x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Goal difference");

  // Add y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Points")

  // Add dots using dataset
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.diff); })
      .attr("cy", function(d) { return y(d.points); })
      .style("fill", function(d) { return color(d.half); })
      .on("mouseover", function(d) {    
          div.transition()
              .style("opacity", .9);
          div.html(d.team)
                .style("left", d3.select(this).attr("cx") + "px")
                .style("top", d3.select(this).attr("cy") + "px")
          })
      .on("mouseout", function(d) {  
          div.transition()    
              .duration(500)    
              .style("opacity", 0); 
          });

  // Adds the legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // Creates the color blocks in the legend
  legend.append("rect")
      .attr("x", width - 18)
      .attr("y", height - 80)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // Adds text next to the color blockss
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", height - 72)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
  });

