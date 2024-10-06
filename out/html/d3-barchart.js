d3.barchart = function() {
    var width = 500;
    var height = 400;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height);

            // Grupy frakcji
            var factions = d3.map(data, function(d) { return d.faction; }).keys();
            var types = d3.map(data, function(d) { return d.type; }).keys();

            var x0 = d3.scaleBand()
                .range([margin.left, width - margin.right])
                .padding(0.1)
                .domain(factions);

            var x1 = d3.scaleBand()
                .padding(0.05)
                .domain(types)
                .range([0, x0.bandwidth()]);

            var y = d3.scaleLinear()
                .range([height - margin.bottom, margin.top])
                .domain([0, d3.max(data, function(d) { return d.value; })]);

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                .call(d3.axisBottom(x0));

            svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + margin.left + ",0)")
                .call(d3.axisLeft(y));

            var color = d3.scaleOrdinal()
                .domain(types)
                .range(["steelblue", "orange"]);

            var faction = svg.selectAll(".faction")
                .data(data)
                .enter().append("g")
                .attr("class", "faction")
                .attr("transform", function(d) { return "translate(" + x0(d.faction) + ",0)"; });

            faction.selectAll("rect")
                .data(function(d) { return types.map(function(type) { return {type: type, value: d.value, faction: d.faction}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.type); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - margin.bottom - y(d.value); })
                .attr("fill", function(d) { return color(d.type); });
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