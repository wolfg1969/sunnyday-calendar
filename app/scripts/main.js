'use strict';

(function(){
    
    function monthPath(t0) {
      var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
          d0 = +day(t0), w0 = +week(t0),
          d1 = +day(t1), w1 = +week(t1);
      return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize + 
          'H' + w0 * cellSize + 'V' + 7 * cellSize +
          'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize + 
          'H' + (w1 + 1) * cellSize + 'V' + 0 + 
          'H' + (w0 + 1) * cellSize + 'Z';
    }

    var width = 960,
        height = 136,
        cellSize = 17; // cell size

    var day = d3.time.format('%w'),
        week = d3.time.format('%U'),
        //percent = d3.format('.1%'),
        format = d3.time.format('%Y-%m-%d');

    var svg = d3.select('#calendar').selectAll('svg')
        .data(d3.range(2014, (new Date()).getFullYear()+1).sort(function(a, b) { return b-a; }))
        .enter().append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'RdYlGn')
        .append('g')
        .attr('transform', 'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

    svg.append('text')
        .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
        .style('text-anchor', 'middle')
        .text(function(d) { return d; });

    var rect = svg.selectAll('.day')
        .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append('rect')
        .attr('class', 'day')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) { return week(d) * cellSize; })
        .attr('y', function(d) { return day(d) * cellSize; })
        .datum(format);
        
    var div = d3.select('body')
    	.append('div')  // declare the tooltip div 
    	.attr('class', 'tooltip')              // apply the 'tooltip' class
    	.style('opacity', 0);

    rect.append('title')
        .text(function(d) { return d; });

    svg.selectAll('.month')
        .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append('path')
        .attr('class', 'month')
        .attr('d', monthPath);

    d3.json('sample-data.json', function(error, json) {
      if (error) {
          return console.warn(error);
      }
      var data = json;

      rect.filter(function(d) { return d in data; })
          .attr('style', function(d) { 
              return 'fill: rgb' + data[d].color + ';';
          })
          .on('mouseover', function(d) { 
              if (data[d]) {    
                  div.transition()
                      .duration(500)    
                      .style('opacity', 0);
                  div.transition()
                      .duration(200)    
                      .style('opacity', 1);    
                  div.html('<img src="' + data[d].url + '">')     
                      .style('left', (d3.event.pageX) + 'px')             
                      .style('top', (d3.event.pageY + 20) + 'px');
                  div.transition()
                      .delay(2000)    
                      .style('opacity', 0);
              }
          })
          .select('title')
          .text(function(d) { return d; })
          ;
    });

    d3.select(self.frameElement).style('height', '2910px');
})();