import React, {Fragment,useState} from "react";
import * as d3 from "d3";
import '../src/App.css'

const PieChart2 = () => {

    const [darkPieColors] = useState(["#0F1521", "#2AD000", "#E20001", "#F99500", "#FFFFFF"])

    var w = 300;
    var h = 300;

    var dataset = [5, 2, 1, 50, 150, 258];

    var outerRadius = w / 2;
    var innerRadius = 0;
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var pie = d3.pie()

// Easy colors accessible via a 10-step ordinal scale
    var color = d3.scaleOrdinal(darkPieColors);

// Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

// Set up groups
    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
        .on("mouseover", function (event,d) {
            d3.select("#tooltip")
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .text(d.value);
        })
        .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#tooltip")
                .style("opacity", 0);
            ;
        });

// Draw arc paths
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

// Labels
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value;
        });

    return (
        <Fragment>
            <div id="tooltip" className="hidden">
                <p><strong>Important Label Heading</strong>
                </p>
                <p><span id="value">100</span>%</p>
            </div>
        </Fragment>
    )
}

export default PieChart2