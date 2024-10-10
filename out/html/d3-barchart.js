d3.simpleBarchart = function(groups, groupColors, groupNames) {
    var width = 500,
        height = 300,
        margin = {top: 20, right: 30, bottom: 40, left: 40};

    /* params */
    if (!groups) {
        groups = ['group1', 'group2', 'group3', 'group4', 'group5'];
    }
    if (!groupColors) {
        groupColors = {
            'strength': '#00FF00', // green
            'dissent': '#FF0000'   // red
        };
    }
    if (!groupNames) {
        groupNames = {
            'group1': 'Group 1',
            'group2': 'Group 2',
            'group3': 'Group 3',
            'group4': 'Group 4',
            'group5': 'Group 5'
        };
    }

    function barchart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this)
                        .attr("width", width)
                        .attr("height", height);

            var chartWidth = width - margin.left - margin.right;
            var chartHeight = height - margin.top - margin.bottom;

            var x0 = d3.scaleBand()
                       .domain(data.map(d => d.group))
                       .range([0, chartWidth])
                       .padding(0.1);

            var x1 = d3.scaleBand()
                       .domain(['strength', 'dissent'])
                       .range([0, x0.bandwidth()])
                       .padding(0.05);

            var y = d3.scaleLinear()
                      .domain([0, 100])
                      .nice()
                      .range([chartHeight, 0]);

            var g = svg.append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", "translate(0," + chartHeight + ")")
             .call(d3.axisBottom(x0));

            g.append("g")
             .attr("class", "axis axis--y")
             .call(d3.axisLeft(y).ticks(10));

            // Tooltip
            var tooltip = d3.select("body").append("div")
                            .attr("class", "barchart-tooltip")
                            .style("position", "absolute")
                            .style("visibility", "hidden");

            var group = g.selectAll(".group")
                         .data(data)
                         .enter().append("g")
                         .attr("transform", d => "translate(" + x0(d.group) + ",0)");

            group.selectAll("rect")
                 .data(d => [d])
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", d => x1(d.subgroup))
                 .attr("y", d => y(d.value))
                 .attr("width", x1.bandwidth())
                 .attr("height", d => chartHeight - y(d.value))
                 .attr("fill", d => groupColors[d.subgroup])
                 .on("mouseover", function(event, d) {
                     tooltip.style("visibility", "visible")
                            .text(d.group + " (" + d.subgroup + "): " + d.value);
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

    return barchart;
}