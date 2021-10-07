let legendTest = function(){
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data =>{

      let dataset = data.monthlyVariance;
      let yearsArray = dataset.map(item => item.year)
      let varianceArr = dataset.map(item => item.variance)
      let legendArr = [ {temp: 2.8, color: 'rgb(69, 117, 180)'}, {temp: 3.9, color: ' rgb(116, 173, 209)'}, {temp: 5.0, color: 'rgb(171, 217, 233)'}, {temp: 6.1, color: 'rgb(224, 243, 248)'}, {temp: 7.2, color:'rgb(255,255,191)'}, {temp: 8.3, color: 'rgb(254, 224, 144)'}, {temp: 9.5, color: 'rgb(253, 174, 97)'}, {temp: 10.6, color: 'rgb(244, 109, 67)'}, {temp: 11.7, color: 'rgb(215, 48, 39)'}, {temp: 12.8, color: 'rgb(255,255,255)'}]
      let tempArr = legendArr.map(item => item.temp)

      const w = 1300;
      const h = 500;
      const padding = 100;
  
      const baseTemp = 8.66 

  
      const xScale = d3.scaleLinear()
                      .domain([d3.min(yearsArray), d3.max(yearsArray)])
                      .range([padding, w-padding])
  
      const yScale = d3.scaleLinear()
                      .domain([1,12.5])
                      .range([padding, h - padding])

      const legendScale = d3.scaleLinear()
                          .domain([d3.min(tempArr), d3.max(tempArr)])
                          // .domain([0, d3.max(tempArr)])
                          .range([xScale(1760), xScale(1760) + 400])
      const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      



      const xAxis = d3.axisBottom(xScale).ticks(30).tickFormat(d3.format('1994'));
      const yAxis = d3.axisLeft(yScale).ticks(12).tickFormat((d,i) => monthsArray[i])

      const legendAxis = d3.axisBottom(legendScale).ticks(legendArr.length).tickFormat((d,i) => tempArr[i])







const svg = d3.select("#legendContainer")
.append("svg")
.attr("width", w)
// .attr("height", h + 100)
.attr("height", h)
.attr("class","svg")
.attr("id", "legend")

svg
.selectAll("rect")
.data(legendArr)
.enter()
.append("rect")
.attr("class","legend-box")
//why does this need the +8???
.attr("x", (d,i) => xScale(1760) + 400/legendArr.length * i+8)
// .attr("y", h/2)
.attr("y", 0)
//   .attr("z-index", (d,i) => 2000+i)
.attr("height", 40)
.attr("width", 40)
.attr("fill", (d,i) => d.color)
// .style("border-style", "solid")
// .style("border-width", "10px")
// .style("border-color", "black")


 
 svg.append("g")
      .attr("id", "legend-axis")
      // .attr("transform", "translate(0, " + (h/2 + 40 ) + ")")
      .attr("transform", "translate(0, " + (40 ) + ")")
      .call(legendAxis);




}



  
)

}

legendTest();