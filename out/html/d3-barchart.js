// Initialize the bar chart
var bars = d3.barchart(false,
    [
        { faction: 'Repairers', strength: 'repairers_strength', dissent: 'repairers_dissent' },
        { faction: 'Liberals', strength: 'liberals_strength', dissent: 'liberals_dissent' },
        { faction: 'Sanacja Left', strength: 'sanacja_left_strength', dissent: 'sanacja_left_dissent' },
        { faction: 'Colonels', strength: null, dissent: 'colonels_dissent' },
        { faction: 'Conservatives', strength: 'conservatives_strength', dissent: 'conservatives_dissent' },
        { faction: 'Fourth Brigade', strength: 'fourth_brigade_strength', dissent: 'fourth_brigade_dissenth' }
    ],
    {
        'strength': '#4682B4', // steelblue for strength
        'dissent': '#FF6347'   // tomato for dissent
    },
    {
        'repairers_strength': 'Repairers Strength', 
        'repairers_dissent': 'Repairers Dissent', 
        'liberals_strength': 'Liberals Strength', 
        'liberals_dissent': 'Liberals Dissent', 
        'sanacja_left_strength': 'Sanacja Left Strength', 
        'sanacja_left_dissent': 'Sanacja Left Dissent', 
        'colonels_dissent': 'Colonels Dissent',
        'conservatives_strength': 'Conservatives Strength', 
        'conservatives_dissent': 'Conservatives Dissent', 
        'fourth_brigade_strength': 'Fourth Brigade Strength', 
        'fourth_brigade_dissenth': 'Fourth Brigade Dissent'
    }
);

// Set the width and height for the chart
bars.width(800).height(500);

// Select the element where the bar chart will be rendered and bind the data
d3.select("#faction_strength_dissent").datum(Q.faction_records).call(bars);
