// d3-barchart.js
function createBarChart(data, elementId) {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(`#${elementId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand()
        .domain(data.map(d => d.group))
        .range([0, width])
        .paddingInner(0.1);

    const x1 = d3.scaleBand()
        .domain(['strength', 'dissent'])
        .range([0, x0.bandwidth()])
        .padding(0.05);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max([d.strength, d.dissent]))])
        .nice()
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(['strength', 'dissent'])
        .range(['#1f77b4', '#ff7f0e']);

    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", d => `translate(${x0(d.group)},0)`)
        .selectAll("rect")
        .data(d => ['strength', 'dissent'].map(key => ({ key, value: d[key] })))
        .enter().append("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.key));

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));
}