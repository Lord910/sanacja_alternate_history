/*
 * MIT License
 * © Copyright 2016 - Geoffrey Brossard (me@geoffreybrossard.fr)
 */

d3.barchart = function() {
    /* params */
    var width,
        height,
        margin = {top: 20, right: 30, bottom: 40, left: 40};

    /* animations */
    var enter = {
            "fromBottom": true
        },
        update = {
          'animate': true,
        },
        exit = {
            "toBottom": true
        };

    /* events */
    var barchartDispatch = d3.dispatch("click", "dblclick", "mousedown", "mouseenter",
        "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "touchcancel", "touchend",
        "touchmove", "touchstart");

    function barchart(data) {
        console.log(data);
        data.each(function(d) {

            // if user did not provide, fill the svg:
            width = width ? width : this.getBoundingClientRect().width;
            height = height ? height : this.getBoundingClientRect().height;

            var svg = d3.select(this);

            /* init the svg */
            svg.attr("width", width)
               .attr("height", height);

            var chartWidth = width - margin.left - margin.right;
            var chartHeight = height - margin.top - margin.bottom;

            var x = d3.scaleBand()
                      .domain(d.map(function(p) { return p.id; }))
                      .range([0, chartWidth])
                      .padding(0.1);

            var y = d3.scaleLinear()
                      .domain([0, d3.max(d, function(p) { return p.seats; })])
                      .nice()
                      .range([chartHeight, 0]);

            var g = svg.append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.append("g")
             .attr("class", "axis axis--x")
             .attr("transform", "translate(0," + chartHeight + ")")
             .call(d3.axisBottom(x));

            g.append("g")
             .attr("class", "axis axis--y")
             .call(d3.axisLeft(y).ticks(10, "s"));

            /* create bars */
            var bars = g.selectAll(".bar")
                        .data(d)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(p) { return x(p.id); })
                        .attr("y", function(p) { return y(p.seats); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(p) { return chartHeight - y(p.seats); })
                        .attr("fill", function(p) { return p.color; });

            /* animation adding bars to the barchart */
            if (enter.fromBottom) {
                bars.attr("y", chartHeight)
                    .attr("height", 0)
                    .transition()
                    .duration(1000)
                    .attr("y", function(p) { return y(p.seats); })
                    .attr("height", function(p) { return chartHeight - y(p.seats); });
            }

            /* bars catch mouse and touch events */
            for (var evt in barchartDispatch._) {
                (function(evt){
                    bars.on(evt, function(e) { barchartDispatch.call(evt, this, e); });
                })(evt);
            }

            /* animation updating bars in the barchart */
            if (update.animate) {
              bars.transition()
                  .duration(1000)
                  .attr("y", function(p) { return y(p.seats); })
                  .attr("height", function(p) { return chartHeight - y(p.seats); });
            }

            /* animation removing bars from the barchart */
            if (exit.toBottom) {
                bars.exit()
                    .transition()
                    .duration(1000)
                    .attr("y", chartHeight)
                    .attr("height", 0)
                    .remove();
            } else {
                bars.exit().remove();
            }
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

    barchart.enter = {
        fromBottom: function (value) {
            if (!arguments.length) return enter.fromBottom;
            enter.fromBottom = value;
            return barchart.enter;
        }
    };

    barchart.update = {
      animate: function(value) {
        if (!arguments.length) return update.animate;
        update.animate = value;
        return barchart.update;
      }
    }

    barchart.exit = {
        toBottom: function (value) {
            if (!arguments.length) return exit.toBottom;
            exit.toBottom = value;
            return barchart.exit;
        }
    };

    barchart.on = function(type, callback) {
        barchartDispatch.on(type, callback);
    }

    return barchart;
}