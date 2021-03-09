import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import '../src/App.css'

const Pie = props => {

    const [width] = useState(400);
    const [height] = useState(400);
    const [innerRadius] = useState(0);
    const [outerRadius] = useState(150);
    const [bgColor, setBgColor] = useState('')

    const [darkPieColors] = useState(["#0F1521", "#2AD000", "#E20001", "#F99500", "#FFFFFF"])
    const [lightPieColor] = useState(["#1C1F21", "#2AD000", "#E20001", "#F99500", "#273755"])

    const [pieColors, setPieColors] = useState([])


    const ref = useRef(null);

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);

    const createArc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    // setting color of pie chart for each arc

    const format = d3.format(".2f");

    const formatText = (str) => {
        const length = str.length;
        if (length > 10) {
            return str.substring(0, 9) + '..'
        } else {
            return str.substring(0,10)
        }

    }


    useEffect(() => {

        if (props.theme) {
            if (props.theme === 'dark') {
                // background color changes when theme is dark
                setBgColor('#273755')
                setPieColors(darkPieColors)
            } else if (props.theme === 'light') {
                // background color changes when theme is light
                setBgColor('#F2F4F6')
                setPieColors(lightPieColor)
            }
        }

    }, [props.theme])

    useEffect(
        () => {
            const data = createPie(props.data);
            const group = d3.select(ref.current);

            //changing color based on theme
            const colors = d3.scaleOrdinal(pieColors);

            const groupWithData = group.selectAll("g.arc").data(data);


            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc")
                .on("mouseover", function (event, d) {
                    d3.select("#tooltip")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .text(d.data.name + " - " + d.value);
                })
                .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#tooltip")
                        .style("opacity", 0);
                    ;
                });

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            path
                .attr("class", "arc")
                .attr("d", createArc)
                .attr("fill", (d, i) => colors(i));


            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .style("fill", "#dddddd")
                .style("font-size", "0.8rem")
                .style("font-weight", 600)
                .style("width", 200)
                .style("height", "auto")
                .text(d => formatText(d.data.name))
        },
        [props.data, pieColors]
    );


    return (
        <div className="themeColor" style={{background: bgColor}}>
            <div className="container">

                <div className="chart-center">

                    <div id="tooltip" className="hidden">
                        <p><span id="value">100</span>%</p>
                    </div>

                    <svg width={width} height={height} viewBox={"0 0 300 300"} preserveAspectRatio={"xMinYMin meet"}>
                        <g
                            ref={ref}
                            transform={`translate(${outerRadius} ${outerRadius})`}
                        />
                    </svg>
                </div>
                <div className="changeTheme">
                    <button className="changeThemeBtn" onClick={props.handleThemeClick}>
                        Change Theme
                    </button>
                </div>

            </div>
        </div>

    );
};

export default Pie;
