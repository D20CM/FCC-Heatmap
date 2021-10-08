const w = 1300;
const h = 500;
const padding = 100;

const baseTemp = 8.66 
const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let legendArr = [ {temp: 2.8, color: 'rgb(69, 117, 180)'}, {temp: 3.9, color: ' rgb(116, 173, 209)'}, {temp: 5.0, color: 'rgb(171, 217, 233)'}, {temp: 6.1, color: 'rgb(224, 243, 248)'}, {temp: 7.2, color:'rgb(255,255,191)'}, {temp: 8.3, color: 'rgb(254, 224, 144)'}, {temp: 9.5, color: 'rgb(253, 174, 97)'}, {temp: 10.6, color: 'rgb(244, 109, 67)'}, {temp: 11.7, color: 'rgb(215, 48, 39)'}, {temp: 12.8, color: 'rgb(255,255,255)'}]



let heatmap = function(){
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data =>{

 
    let dataset = data.monthlyVariance;
    console.log(dataset[2].year);

    let yearsArray = dataset.map(item => item.year)
    console.log(yearsArray);

    let varianceArr = dataset.map(item => item.variance)
    console.log(varianceArr);

   

    const xScale = d3.scaleLinear()
                    .domain([d3.min(yearsArray), d3.max(yearsArray)])
                    .range([padding, w-padding])

    const yScale = d3.scaleLinear()
                    .domain([1,12.5])
                    .range([padding, h - padding])


   
    
    const thresholdScale = d3.scaleThreshold()
    .domain([ 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])   
    .range(['rgb(69, 117, 180)',' rgb(116, 173, 209)', 'rgb(171, 217, 233)', 'rgb(224, 243, 248)', 'rgb(255,255,191)', 'rgb(254, 224, 144)', 'rgb(253, 174, 97)', 'rgb(244, 109, 67)', 'rgb(215, 48, 39)', 'rgb(165, 0, 38)']);

    const svg = d3.select("#appContainer")
                .append("svg")
                .attr("width", w)
                .attr("height", h + 100)
                .attr("class","svg")
                .attr("fill", "blue")
                .attr("id", "graph")

    
    
    const xAxis = d3.axisBottom(xScale).ticks(30).tickFormat(d3.format('1994'));
    const yAxis = d3.axisLeft(yScale).ticks(12).tickFormat((d,i) => monthsArray[i])

    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (h - padding ) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)
    
    svg.append("g")
      .attr("id", "x-label")
      .attr("transform", "translate("+ (w/2) +", " + (h - padding/2) + ")")
      .append("text")
      .text("Years")

    svg.append("g")
      .attr("id", "y-label")
      .attr("transform", "translate(" + 20 + ","+ (h/2) + ") rotate(-90)")
      .append("text")
      .text("Months")



    let tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("visibility", "hidden")
                    .style("position", "absolute")
                    .style("z-index","10")
                    .style("background","#fff3e0")
                    .text("testing")


    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d,i) => xScale(d.year))
        .attr("y", (d,i) => yScale(d.month) - 14)
       
        .attr("width", 5)
        .attr("height", h/12 - 15)
        .attr("fill", (d,i) => thresholdScale(d.variance + baseTemp))
        .attr("class","cell")
        .attr("data-year", (d) => d.year)
        .attr("data-month", (d) =>  d.month - 1)
        .attr("data-temp", (d) => d.variance + baseTemp)
        .on("mouseover", function(e,d){
            let year = d.year;
            let month = monthsArray[d.month-1];
            let temp = parseFloat(d.variance + baseTemp).toFixed(2);
            
            tooltip.text(month + " " + year + ": " + temp + "\xB0C")
            return tooltip
                    .style("visibility", "visible")
                    .attr("data-year", year)
                    
        })

        .on("mousemove", function(event, d){
          return tooltip
                  .style("top", (event.pageY-10)+"px")
                  .style("left",(event.pageX+10)+"px");
        })
    
      .on("mouseout", function(){
          return tooltip
                  .style("visibility", "hidden");
      });
  
  
        

    console.log(dataset)
    console.log(dataset[2].month)
  }
 )

}

heatmap();






let legendTest = function(){
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data =>{

      let dataset = data.monthlyVariance;
      let yearsArray = dataset.map(item => item.year)
      let varianceArr = dataset.map(item => item.variance)
     
      let tempArr = legendArr.map(item => item.temp)

    
  
      const xScale = d3.scaleLinear()
                      .domain([d3.min(yearsArray), d3.max(yearsArray)])
                      .range([padding, w-padding])
  
      const yScale = d3.scaleLinear()
                      .domain([1,12.5])
                      .range([padding, h - padding])

      const legendScale = d3.scaleLinear()
                          .domain([d3.min(tempArr), d3.max(tempArr)])
                          .range([xScale(1760), xScale(1760) + 400])
    
      



      const xAxis = d3.axisBottom(xScale).ticks(30).tickFormat(d3.format('1994'));
      const yAxis = d3.axisLeft(yScale).ticks(12).tickFormat((d,i) => monthsArray[i])

      const legendAxis = d3.axisBottom(legendScale).ticks(legendArr.length).tickFormat((d,i) => tempArr[i])







const svg = d3.select("#legendContainer")
.append("svg")
.attr("width", w)
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
.attr("y", 0)
.attr("height", 40)
.attr("width", 40)
.attr("fill", (d,i) => d.color)



 
 svg.append("g")
      .attr("id", "legend-axis")
      .attr("transform", "translate(0, " + (40 ) + ")")
      .call(legendAxis);

}
)
}

legendTest();