var margin = {top: 30, right: 30, bottom: 30, left: 30};
var width = 510- margin.left - margin.right;
var height = 510 - margin.top - margin.bottom;

//Dados
d3.csv('resultado_tryout.csv', function(dataset) {
    dataset.forEach(function(d){
        d["40 Yard Dash"] = +d["40 Yard Dash"];
    });

    console.log(dataset);

//Escalas
var dataXinterval = d3.extent(dataset, d=>d["40 Yard Dash"]);
var xScale = d3.scaleLinear().domain(dataXinterval).range([0, width-margin.left]);

var dataYinterval = ["QB", "OL", "DL", "RB", "LB", "TE", "DB", "WR", "x"];
var yScale = d3.scaleOrdinal().domain(dataYinterval).range([0, 50, 100, 150, 200, 250, 300, 350, 400, height-margin.top]);
var mySVG = d3.select('svg')
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//scatterplots
mySVG
.selectAll()
.data(dataset)
.enter()
.append('g')
.attr('Class', d=>d["Candidato"])
.append('circle')
.attr("cx",d=>xScale(d["40 Yard Dash"]))
.attr("cy",d=>yScale(d["Posição"]))
.attr("r",5);

mySVG
.selectAll('g')
.append('text')
.text(d=>d["Candidato"])
.attr('x', d=>xScale(d["40 Yard Dash"]))
.attr('y', d=>yScale(d["Posição"])-5)
.attr('display', 'none');


var xAxisGroup = mySVG.append('g')
                           .attr('class','xAxis')
                           .attr('transform','translate(0,'+(height-margin.top)+')');
var xAxis = d3.axisBottom(xScale);
xAxisGroup.call(xAxis);


var yAxisGroup = mySVG.append('g')
                           .attr('class','yAxis')
                           .attr('transform','translate(0, 0)');
var yAxis = d3.axisLeft(yScale);
yAxisGroup.call(yAxis);


mySVG.selectAll('g')
    .on('mouseover',function(d){
    d3.select(this).select('circle').attr('fill', 'red');
    d3.select(this).select('text').attr('display', 'true');
    });

mySVG.selectAll('g')
    .on('mouseout',function(d){
    d3.select(this).select('circle').attr('fill', 'black');
    d3.select(this).select('text').attr('display', 'none');
    });
});