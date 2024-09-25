/*
 * generating a pie chart of multiple parties...
 * */

d3.piechart = function(parties, partyColors, partyNames) {
    /* params */
    if (!parties) {
        parties = ['bbwr', 'kpp', 'pslw', 'pschd', 'pslp', 'sn', 'owp', 'other', 'pps', 'npr', 'sch'];
    }
    if (!partyColors) {
        partyColors = {
            'kpp': '#AF0000', // dark red
            'pps': '#CC0000', // red
            'sch': '#556B2F', // dark olive green
            'pslw': '#179900', // bright green
            'other': '#FFD700', // gold
            'bbwr': '#808080', // gray
            'npr': '#841839', // redish
            'pschd': '#1E90FF', // dodger blue
            'pslp': '#3A6538', // dark green
            'sn': '#0000CD', // dark blue
            'owp': '#954B00' // brown
        };
    }
    if (!partyNames) {
        partyNames = {'bbwr': 'BBWR', 'kpp': 'KPP', 'pslw': 'PSL-W', 'pschd': 'PSCHD + NPR', 'pslp': 'PSL-P', 'sn': '[+ sn_party_name +]', 'owp': 'OWP', 'other': 'Others', 'pps': 'PPS','npr': 'NPR','sch': 'SCh' };
    }

    // Declare the chart dimensions and margins.
    var width = 500;
    var height = 400;
    var radius = Math.min(width, height) / 2;

    function piechart(dataset) {
        dataset.each(function (data) {
            // Create the pie chart layout.
            var pie = d3.pie()
                .value(d => d.value)
                .sort(null);

            // Create the arc generator.
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            // Create the SVG container.
            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            // Prepare the data.
            var pieData = pie(parties.map(party => ({ party: party, value: data[party] })));

            // Draw the pie slices.
            svg.selectAll("path")
                .data(pieData)
                .enter().append("path")
                .attr("fill", d => partyColors[d.data.party])
                .attr("d", arc)
                .on("mouseover", function (d) {
                    d3.select(this).attr("opacity", 0.7);
                })
                .on("mouseout", function (d) {
                    d3.select(this).attr("opacity", 1);
                });

            // Draw the labels.
            svg.selectAll("text")
                .data(pieData)
                .enter().append("text")
                .attr("transform", d => `translate(${arc.centroid(d)})`)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(d => partyNames[d.data.party])
                .on("mouseover", function (d) {
                    d3.select(this).attr("font-weight", "bold");
                })
                .on("mouseout", function (d) {
                    d3.select(this).attr("font-weight", "normal");
                });
        });
    }

    piechart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        radius = Math.min(width, height) / 2;
        return piechart;
    };

    piechart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        radius = Math.min(width, height) / 2;
        return piechart;
    };

    piechart.parties = function(value) {
        if (!arguments.length) return parties;
        parties = value;
        return piechart;
    };

    piechart.partyNames = function(value) {
        if (!arguments.length) return partyNames;
        partyNames = value;
        return piechart;
    };

    piechart.partyColors = function(value) {
        if (!arguments.length) return partyColors;
        partyColors = value;
        return piechart;
    };

    return piechart;
};

// Dane do wizualizacji
var data = {
    workers: {
        'kpp': [+robotnicy_kpp_normalized+],
        'pps': [+robotnicy_pps_normalized+],
        'sch': [+robotnicy_sch_normalized+],
        'pslw': [+robotnicy_pslw_normalized+],
        'other': [+robotnicy_other_normalized+],
        'bbwr': [+robotnicy_bbwr_normalized+],
        'npr': [+robotnicy_npr_normalized+],
        'pschd': [+robotnicy_pschd_normalized+],
        'pslp': [+robotnicy_pslp_normalized+],
        'sn': [+robotnicy_sn_normalized+],
        'owp': [+robotnicy_owp_normalized+]
    },
    newMiddleClass: {
        'kpp': [+klasa_srednia_kpp_normalized+],
        'pps': [+klasa_srednia_pps_normalized+],
        'sch': [+klasa_srednia_sch_normalized+],
        'pslw': [+klasa_srednia_pslw_normalized+],
        'other': [+klasa_srednia_other_normalized+],
        'bbwr': [+klasa_srednia_bbwr_normalized+],
        'npr': [+klasa_srednia_npr_normalized+],
        'pschd': [+klasa_srednia_pschd_normalized+],
        'pslp': [+klasa_srednia_pslp_normalized+],
        'sn': [+klasa_srednia_sn_normalized+],
        'owp': [+klasa_srednia_owp_normalized+]
    },
    oldMiddleClass: {
        'kpp': [+klasa_wyzsza_kpp_normalized+],
        'pps': [+klasa_wyzsza_pps_normalized+],
        'sch': [+klasa_wyzsza_sch_normalized+],
        'pslw': [+klasa_wyzsza_pslw_normalized+],
        'other': [+klasa_wyzsza_other_normalized+],
        'bbwr': [+klasa_wyzsza_bbwr_normalized+],
        'npr': [+klasa_wyzsza_npr_normalized+],
        'pschd': [+klasa_wyzsza_pschd_normalized+],
        'pslp': [+klasa_wyzsza_pslp_normalized+],
        'sn': [+klasa_wyzsza_sn_normalized+],
        'owp': [+klasa_wyzsza_owp_normalized+]
    },
    peasants: {
        'kpp': [+chlopi_kpp_normalized+],
        'pps': [+chlopi_pps_normalized+],
        'sch': [+chlopi_sch_normalized+],
        'pslw': [+chlopi_pslw_normalized+],
        'other': [+chlopi_other_normalized+],
        'bbwr': [+chlopi_bbwr_normalized+],
        'npr': [+chlopi_npr_normalized+],
        'pschd': [+chlopi_pschd_normalized+],
        'pslp': [+chlopi_pslp_normalized+],
        'sn': [+chlopi_sn_normalized+],
        'owp': [+chlopi_owp_normalized+]
    }
};

// Funkcja do generowania wykresu kołowego
function generatePieChart(data, selector) {
    var width = 500;
    var height = 400;
    var radius = Math.min(width, height) / 2;

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var svg = d3.select(selector)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    var pieData = pie(Object.keys(data).map(key => ({ party: key, value: data[key] })));

    svg.selectAll("path")
        .data(pieData)
        .enter().append("path")
        .attr("fill", d => partyColors[d.data.party])
        .attr("d", arc)
        .on("mouseover", function (d) {
            d3.select(this).attr("opacity", 0.7);
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("opacity", 1);
        });

    svg.selectAll("text")
        .data(pieData)
        .enter().append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => partyNames[d.data.party])
        .on("mouseover", function (d) {
            d3.select(this).attr("font-weight", "bold");
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("font-weight", "normal");
        });
}

// Generowanie wykresów kołowych dla każdej grupy społecznej
generatePieChart(data.workers, "#workersPieChart");
generatePieChart(data.newMiddleClass, "#newMiddleClassPieChart");
generatePieChart(data.oldMiddleClass, "#oldMiddleClassPieChart");
generatePieChart(data.peasants, "#peasantsPieChart");