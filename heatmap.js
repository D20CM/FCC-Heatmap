let heatmap = function(){
  fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(response => response.json())
  .then(data =>{

    // document.getElementById("appContainer").innerHTML = JSON.stringify(data);
    // let dataset = JSON.stringify(data);
    let dataset = data.monthlyVariance;
    console.log(dataset[2].year);

    let yearsArray = dataset.map(item => item.year)
    console.log(yearsArray);

    // let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // console.log(monthsArray);

    let varianceArr = dataset.map(item => item.variance)
    console.log(varianceArr);

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

    // const colorScale = d3.scaleSequential()
    //                     .domain([d3.min(varianceArr), d3.max(varianceArr)])
    //                     .interpolator(d3.interpolateInferno)

    // const quantileScale = d3.scaleQuantile()
    // // .domain([2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])
    // .domain(varianceArr)
    // .range(['rgb(69, 117, 180)',' rgb(116, 173, 209)', 'rgb(171, 217, 233)', 'rgb(224, 243, 248)', 'rgb(255, 255, 191)', 'rgb(254, 224, 144)', 'rgb(253, 174, 97)', 'rgb(244, 109, 67)', 'rgb(215, 48, 39)', 'rgb(165, 0, 38)']);
   
    
    const thresholdScale = d3.scaleThreshold()
    .domain([ 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])
    // .domain(varianceArr)       
    .range(['rgb(69, 117, 180)',' rgb(116, 173, 209)', 'rgb(171, 217, 233)', 'rgb(224, 243, 248)', 'rgb(255,255,191)', 'rgb(254, 224, 144)', 'rgb(253, 174, 97)', 'rgb(244, 109, 67)', 'rgb(215, 48, 39)', 'rgb(165, 0, 38)']);

    const svg = d3.select("#appContainer")
                .append("svg")
                .attr("width", w)
                .attr("height", h + 100)
                .attr("class","svg")
                .attr("fill", "blue")

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
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
      // .attr("transform", "rotate(-90)")
      .append("text")
      .text("Months")

    // let legend = d3.select("svg")
    //     .append("g")
    //     .attr("id", "legend")
    //     .attr("x","10")
    //     .attr("y","10")
    //     .style("background","#fff3e0")
    //     .style("position", "absolute")
        // .append("div")
        // .attr("id", "block1")
        // .style("background", "rgb(69, 117, 180)")
        // .append("text")
        // .text("testing")

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

    // let legendArr = [ 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8]
    // let legendColorsArr = ['rgb(69, 117, 180)',' rgb(116, 173, 209)', 'rgb(171, 217, 233)', 'rgb(224, 243, 248)', 'rgb(255,255,191)', 'rgb(254, 224, 144)', 'rgb(253, 174, 97)', 'rgb(244, 109, 67)', 'rgb(215, 48, 39)', 'rgb(165, 0, 38)']


    let legendArr = [ {temp: 3.9, color: 'rgb(69, 117, 180)'}, {temp: 5.0, color: ' rgb(116, 173, 209)'}, {temp: 6.1, color: 'rgb(171, 217, 233)'}, {temp: 7.2, color: 'rgb(224, 243, 248)'}, {temp: 8.3, color:'rgb(255,255,191)'}, {temp: 9.5, color: 'rgb(254, 224, 144)'}, {temp: 10.6, color: 'rgb(253, 174, 97)'}, {temp: 11.7, color: 'rgb(244, 109, 67)'}, {temp: 12.8, color: 'rgb(215, 48, 39)'}]
    let legendColorsArr = ['rgb(69, 117, 180)',' rgb(116, 173, 209)', 'rgb(171, 217, 233)', 'rgb(224, 243, 248)', 'rgb(255,255,191)', 'rgb(254, 224, 144)', 'rgb(253, 174, 97)', 'rgb(244, 109, 67)', 'rgb(215, 48, 39)', 'rgb(165, 0, 38)']


    svg.append("rect")
      .attr("id", "legend")
      .attr("x", xScale(1760))
      .attr("y", h)
      .attr("width", 400)
      .attr("height", 200)
      .attr("fill", "red")
      // .append("g")
      .selectAll("rect")
      .data(legendArr)
      .enter()
      .append("rect")
      .attr("class","legend-box")
      .attr("x", (d,i) => xScale(1760) + 400/legendArr.length * i)
      // .attr("x", 20)
      .attr("y", h)
      .attr("z-index", (d,i) => 2000+i)
      .attr("height", 100)
      .attr("width", 100)
      .attr("fill", (d,i) => d.color)
      .append("text")
      .text((d,i) => d.temp)





      // .append("rect")
      // .attr("z-index","500")
      // .attr("id","box1")
      // .style("fill", "blue")
      // .attr("x", xScale(1760))
      // .attr("y", h-20)
      // .attr("width", 200)
      // .attr("height", 100)
      



  }
 )

}

heatmap();