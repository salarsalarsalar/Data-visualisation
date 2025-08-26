var width=1000;
var height=1000;
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

d3.csv("4.csv").then(function (matrix) {
    const nodes = Object.keys(matrix[0]).slice(1);
    console.log(nodes);

    // Create a hierarchical structure
    const root = d3.stratify()
        .id(function (d) { return d.name; })
        .parentId(function (d) {
            const parentIndex = matrix.findIndex(function (row) { return row[d.name] === "1"; });
            if (parentIndex !== -1) { return nodes[parentIndex]; }
            else { return null; }
        })
        (nodes.map(function (name) { return { name: name }; }));

    var tree = d3.tree()
        .size([2 * Math.PI, 350])
        .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    // Generate the tree structure
    const treeData = tree(root);

    svg.selectAll(".link")
        .data(root.links())
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 2)
        .attr("class", "link")
        .attr("d", d3.linkRadial()
        .angle(function (d) { return d.x; })
        .radius(function (d) { return d.y; })
        );

    var nodesGroup = svg.selectAll(".node")
        .data(treeData.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })

    nodesGroup.append("circle")
        .attr("r", 50)
        .attr("fill", "steelblue")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

    // Append labels with node names
    nodesGroup.append("text")
        .attr("dy", "-1.5em")
        .attr("font-size", 15)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .text(d => d.data.name);
});

function radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
};