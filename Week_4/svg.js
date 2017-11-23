/**
Timothy Macmillan Data Processing Week 4
**/



d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);
    d3.selectAll("rect").remove();

    var color = d3.scale.ordinal()
    	.domain(['10000000','1000000','100000','10000','1000','100', 'Unknown Data'])
    	.range(['#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824', '#babcbb']);

   	var legendRectWidth = 21;
   	var legendRectHeight = 21;
   	var legendSpacing = 5;


   	var legend = d3.select('svg')
	    .append("g")
	    .selectAll("g")
	    .data(color.domain())
	    .enter()
	    .append('g')
	      .attr('class', 'legend')
	      .attr('transform', function(d, i) {
	        var height = legendRectHeight;
	        var x = 0;
	        var y = i * height;
	        return 'translate(' + x + ',' + y + ')';
    });

	// legend.append('rect')
	// 	.attr('width', '175.1')
	//     .attr('height', '291.4')
	//     .style('fill', '#ffffff')
	//     .style('stroke', '#020203');

	legend.append('rect')
	    .attr('width', legendRectWidth)
	    .attr('height', legendRectHeight)
	    .style('fill', color)
	    .style('stroke', color);

	legend.append('text')
	    .attr('x', legendRectWidth + legendSpacing)
	    .attr('y', legendRectHeight - legendSpacing)
	    .text(function(d) { return d; });


});
