var margin = {top: 30, right: 30, bottom: 30, left: 30};
var width = 510- margin.left - margin.right;
var height = 510 - margin.top - margin.bottom;

//Dados
d3.csv('CombineBoard.csv', function(dataset) {
    dataset.forEach(function(d){
        d["AVG40"] = +d["AVG40"];
        d["AVG3"] = +d["AVG3"];
        d["20yd"] = +d["20yd"];
    });

    console.log(dataset);

//Escalas
var dataXinterval = d3.extent(dataset, d=>d["AVG3"]);
var xScale = d3.scaleLinear().domain(dataXinterval).range([0, width-margin.left]);

var dataYinterval = ["QB", "OL", "DL", "RB", "LB", "TE", "DB", "WR"];
var yScale = d3.scaleOrdinal().domain(dataYinterval).range([0, 60, 120, 180, 240, 300, 360, 420, height-margin.top]);

var mySVG = d3.select('svg')
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//scatterplots
mySVG
.selectAll()
.data(dataset)
.enter()
.append('g')
.attr('Class', d=>d["Atleta"])
.append('circle')
.attr("cx",d=>xScale(d["AVG3"]))
.attr("cy",d=>yScale(d["Posição"]))
.attr("r",5);

mySVG
.selectAll('g')
.append('text')
.text(d=>d["Atleta"])
.attr('x', d=>xScale(d["AVG3"]))
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