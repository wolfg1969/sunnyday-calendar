"use strict";!function(){function a(a){var b=new Date(a.getFullYear(),a.getMonth()+1,0),c=+e(a),g=+f(a),h=+e(b),i=+f(b);return"M"+(g+1)*d+","+c*d+"H"+g*d+"V"+7*d+"H"+i*d+"V"+(h+1)*d+"H"+(i+1)*d+"V0H"+(g+1)*d+"Z"}var b=960,c=136,d=17,e=d3.time.format("%w"),f=d3.time.format("%U"),g=d3.time.format("%Y-%m-%d"),h=d3.select("#calendar").selectAll("svg").data(d3.range(2013,(new Date).getFullYear()+1).sort(function(a,b){return b-a})).enter().append("svg").attr("width",b).attr("height",c).attr("class","RdYlGn").append("g").attr("transform","translate("+(b-53*d)/2+","+(c-7*d-1)+")");h.append("text").attr("transform","translate(-6,"+3.5*d+")rotate(-90)").style("text-anchor","middle").text(function(a){return a});var i=h.selectAll(".day").data(function(a){return d3.time.days(new Date(a,0,1),new Date(a+1,0,1))}).enter().append("rect").attr("class","day").attr("width",d).attr("height",d).attr("x",function(a){return f(a)*d}).attr("y",function(a){return e(a)*d}).datum(g),j=d3.select("body").append("div").attr("class","tooltip").style("opacity",0);i.append("title").text(function(a){return a}),h.selectAll(".month").data(function(a){return d3.time.months(new Date(a,0,1),new Date(a+1,0,1))}).enter().append("path").attr("class","month").attr("d",a),d3.json("http://sunnyday.guoyong.me/api/",function(a,b){if(a)return console.warn(a);var c=b;i.filter(function(a){return a in c}).attr("style",function(a){return"fill: rgb"+c[a].color+";"}).on("mouseover",function(a){c[a]&&(j.transition().duration(500).style("opacity",0),j.transition().duration(200).style("opacity",1),j.html('<img src="'+c[a].url+'">').style("left",d3.event.pageX+"px").style("top",d3.event.pageY+20+"px"),j.transition().delay(2e3).style("opacity",0))}).select("title").text(function(a){return a})}),d3.select(self.frameElement).style("height","2910px")}();