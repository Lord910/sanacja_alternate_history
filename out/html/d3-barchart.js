d3.simpleBarchart = function() {
    var width = 500,
        height = 300,
        margin = {top: 20, right: 30, bottom: 40, left: 40};

    function barchart(selection) {
        selection.each(function() {
            var svg = d3.select(this)
                        .attr("width", width)
                        .attr("height", height);

            var chartWidth = width - margin.left - margin.right;
            var chartHeight = height - margin.top - margin.bottom;

            var data = [];
            for (var i = 1; i <= 5; i++) {
                data.push({group: 'Group ' + i, subgroup: 'A', value: Math.floor(Math.random() * 10) + 1});
                data.push({group: 'Group ' + i, subgroup: 'B', value: Math.floor(Math.random() * 10) + 1});
            }

            var x0 = d3.scaleBand()
                       .domain(data.map(d => d.group))
                       .range([0, chartWidth])
                       .padding(0.1);

            var x1 = d3.scaleBand()
                       .domain(['A', 'B'])
                       .range([0, x0.bandwidth()])
                       .padding(0.05);

            var y = d3.scaleLinear()
                      .domain([0, 10])
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
                 .attr("height", d => chartHeight - y(d.value));
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

    return barchart;
}