d3.barchart = function() {
    var width = 500;
    var height = 400;
    var margin = {top: 20, right: 20, bottom: 70, left: 40}; // Zwiększono dolny margines

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var subgroups = data.columns.slice(1); // ["Strength", "Dissent"]
            var groups = data.map(function(d) { return d.group; }); // ["Sanacja Left", "Repairers", ...]

            var x = d3.scaleBand()
                .domain(groups)
                .range([0, width - margin.left - margin.right])
                .padding(0.2);

            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d3.max(subgroups, function(key) { return d[key]; }); })])
                .range([height - margin.top - margin.bottom, 0]);

            var xSubgroup = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding(0.05);

            var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#e41a1c','#377eb8','#4daf4a']);

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
                .call(d3.axisBottom(x).tickSize(0))
                .selectAll("text")
                .attr("transform", "rotate(-45)") // Obrót etykiet
                .style("text-anchor", "end"); // Ustawienie kotwicy tekstu

            svg.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(y));

            svg.append("g")
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                  .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("rect")
                  .attr("x", function(d) { return xSubgroup(d.key); })
                  .attr("y", function(d) { return y(d.value); })
                  .attr("width", xSubgroup.bandwidth())
                  .attr("height", function(d) { return height - margin.top - margin.bottom - y(d.value); })
                  .attr("fill", function(d) { return color(d.key); });
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