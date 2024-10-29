function addMonths(date, months) {
    date = new Date(date);
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}

d3.linegraph = function(noTicks, noDots, parties, partyColors, partyNames, dataMax, dataMin = 0, additionalMonths = 10) {
    // Default parameters for parties, colors, and names
    if (!parties) { parties = ['bbwr', 'kpp', 'pslw', 'pschd', 'pslp', 'sn', 'owp', 'pps', 'npr', 'sch']; }
    if (!partyColors) {
        partyColors = {
            'kpp': '#AF0000', 'pps': '#CC0000', 'sch': '#556B2F', 'pslw': '#179900',
            'bbwr': '#808080', 'npr': '#841839', 'pschd': '#1E90FF', 'pslp': '#3A6538', 'sn': '#0000CD', 'owp': '#954B00'
        };
    }
    if (!partyNames) {
        partyNames = {'bbwr': 'BBWR', 'kpp': 'KPP', 'pslw': 'PSL-W', 'pschd': 'PSCHD', 'pslp': 'PSL-P', 'sn': '[+ sn_party_name +]', 'owp': 'OWP', 'pps': 'PPS','npr': 'NPR','sch': 'SCh' };
    }

    var width = 500, height = 400;
    var marginTop = 20, marginRight = 20, marginBottom = 50, marginLeft = 40;

    function linegraph(dataset) {
     dataset.each(function (data) {
      const dates = data.map(d => new Date(d.date));
      const series = parties.map(party => data.map(d => ({'x': new Date(d.date), 'y': d[party], 'series': party})));

      const maxDate = d3.max(dates);
      const xScale = d3.scaleUtc([new Date(1928, 0), addMonths(maxDate, additionalMonths)], [marginLeft, width - marginRight]);

      var xaxis = d3.axisBottom()
        .tickFormat(d3.timeFormat('%b %Y'))
        .tickValues(dates)
        .scale(xScale);
      if (noTicks) {
        xaxis = d3.axisBottom()
        .tickFormat(d3.timeFormat('%b %Y'))
        .ticks(10)
        .scale(xScale);
      }

      // Declare the y (vertical position) scale.
      const yScale = d3.scaleLinear([dataMin, dataMax], [height - marginBottom, marginTop]);

      var svg = d3.select(this);

      svg.append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(xaxis)
          .selectAll("text")
          .attr("text-anchor", "end")
          .attr("dx", "-0.8em")
          .attr("dy", "0.1em")
          .attr("transform", "rotate(-30)");

      svg.append("g")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(d3.axisLeft(yScale));

      const partyLine = (party) => d3.line()
          .x(d => xScale(new Date(d.date)))
          .y(d => yScale(d[party]));

      for (const party of parties) {
        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", partyColors[party])
          .attr("stroke-width", 1.5)
          .attr("class", party + " " + "party-line")
          .attr("id", party+"-line")
          .attr("series", party)
          .attr("d", partyLine(party)(data));
      }
     });
    }

    linegraph.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return linegraph;
    };

    linegraph.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return linegraph;
    };

    return linegraph;
};
