d3.simpleBarchart = function(groups, groupColors, groupNames, dataFields = ['value']) {
    var width = 500,
        height = 300,
        margin = {top: 20, right: 30, bottom: 40, left: 40};

    // Default colors and names if none are provided
    if (!groupColors) {
        groupColors = {
            'strength': '#00FF00', // green
            'dissent': '#FF0000',  // red
            'votes': '#1E90FF'     // blue
        };
    }
    if (!groupNames) {
        groupNames = {
            'group1': 'Group 1',
            'group2': 'Group 2',
            'group3': 'Group 3'
        };
    }

    function barchart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this)
                        .attr("width", width)
                        .attr("height", height);

            var chartWidth = width - margin.left - margin.right;
            var chartHeight = height - margin.top - margin.bottom;

            // Set up x-axis with main groups
            var x0 = d3.scaleBand()
                       .domain(data.map(d => d.group))
                       .range([0, chartWidth])
                       .padding(0.1);

            // Set up inner x-axis for sub-groups if multiple fields are provided
            var x1 = d3.scaleBand()
                       .domain(dataFields)
                       .range([0, x0.bandwidth()])
                       .padding(0.05);

            // Calculate y-axis max based on provided data fields
            var yMax = d3.max(data, d => 
                d3.max(dataFields.map(field => d[field] || 0))
            );
            var y = d3.scaleLinear()
                      .domain([0, yMax])
                      .nice()
                      .range([chartHeight, 0]);

            var g = svg.append("g")
                       .attr("transform", `translate(${margin.left},${margin.top})`);

            // X-axis
            g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", `translate(0,${chartHeight})`)
             .call(d3.axisBottom(x0).tickFormat(d => groupNames[d]));

            // Y-axis
            g.append("g")
             .attr("class", "axis axis--y")
             .call(d3.axisLeft(y).ticks(10));

            // Tooltip
            var tooltip = d3.select("body").append("div")
                            .attr("class", "barchart-tooltip")
                            .style("position", "absolute")
                            .style("visibility", "hidden");

            // Draw bars for each group and data field
            var group = g.selectAll(".group")
                         .data(data)
                         .enter().append("g")
                         .attr("transform", d => `translate(${x0(d.group)},0)`);

            group.selectAll("rect")
                 .data(d => dataFields.map(field => ({group: d.group, field: field, value: d[field] || 0})))
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", d => x1(d.field))
                 .attr("y", d => y(d.value))
                 .attr("width", x1.bandwidth())
                 .attr("height", d => chartHeight - y(d.value))
                 .attr("fill", d => groupColors[d.field] || '#000')  // Default to black if color not found
                 .on("mouseover", function(event, d) {
                     tooltip.style("visibility", "visible")
                            .text(`${groupNames[d.group]} (${d.field}): ${d.value}`);
                 })
                 .on("mousemove", function(event) {
                     tooltip.style("top", (event.pageY - 10) + "px")
                            .style("left", (event.pageX + 10) + "px");
                 })
                 .on("mouseout", function() {
                     tooltip.style("visibility", "hidden");
                 });
        });
    }

    // Configuration setters
    barchart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return barchart;
    };

    barchart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return barchart;
    };

    barchart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return barchart;
    };

    barchart.colors = function(value) {
        if (!arguments.length) return groupColors;
        groupColors = value;
        return barchart;
    };

    barchart.names = function(value) {
        if (!arguments.length) return groupNames;
        groupNames = value;
        return barchart;
    };

    barchart.fields = function(value) {
        if (!arguments.length) return dataFields;
        dataFields = value;
        return barchart;
    };

    return barchart;
};