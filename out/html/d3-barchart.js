d3.barchart = function() {
    var width = 500;
    var height = 400;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height);

            var x = d3.scaleBand()
                .range([margin.left, width - margin.right])
                .padding(0.1)
                .domain(data.map(function(d) { return d.name; }));

            var y = d3.scaleLinear()
                .range([height - margin.bottom, margin.top])
                .domain([0, d3.max(data, function(d) { return d.value; })]);

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");

            svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + margin.left + ",0)")
                .call(d3.axisLeft(y));

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.name); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - margin.bottom - y(d.value); })
                .attr("fill", function(d) { return d.color; });
        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    return chart;
};