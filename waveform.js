function initControls(){select(".btn-sample").mouseClicked(function(){select("#dropzone").style("visibility","hidden"),select(".loader").style("visibility","visible"),waveform=new Waveform,waveform.audio=loadSound("./audio/sample.mp3",function(){waveform.duration=waveform.audio.duration(),waveform.setAmplitudeInput(waveform.audio),waveform.timeToDraw=!0,select(".loader").style("visibility","hidden"),select(".play").style("visibility","visible"),loop()})}),select(".btn-play").mouseClicked(function(){return waveform.audio._playing===!0?"Audio is already playing":(waveform.audio.play(),select(".play").style("visibility","hidden"),select(".controls").style("visibility","visible"),void 0)}),select(".btn-pause").mouseClicked(function(){waveform.audio._playing===!0?(waveform.audio.pause(),this.elt.innerHTML="Play"):(waveform.audio.play(),this.elt.innerHTML="Pause")}),select(".btn-save").mouseClicked(function(){writeDownloadLink()}),slider=createSlider(1,40,1,1),slider.parent("#input-slider");var a=createFileInput(fileInput);a.parent("#input-file"),a["class"]("custom-file-input")}function trySampleFile(){console.log("clicked")}function writeDownloadLink(){try{!!new Blob}catch(a){alert("Blob not supported.")}var b=select("svg");b.attribute("title","test2"),b.attribute("version",1.1),b.attribute("xmlns","http://www.w3.org/2000/svg");var c=new Date;saveAs(new Blob([b.elt.parentNode.innerHTML],{type:"application/svg+xml"}),"waveform-"+c.getTime()+".svg")}function setup(){pixelDensity(1),canvas=createCanvas(canvasWidth,canvasHeight,SVG),select("#canvas-area").drop(fileInput),select("#defaultCanvas0").parent("#canvas-area"),select("#defaultCanvas0")["class"](".inner"),sliderSpan=document.getElementById("sliderSpan"),initControls(),waveform=new Waveform,noLoop()}function draw(){var a=slider.value();waveform.step=int(a),waveform.storeAmplitude(waveform.amplitude.getLevel()),frameCount%10===0&&(clear(),background(backgroundColor),waveform.getAverageAmplitudes(),push(),translate(0,canvasHeight/2),waveform.drawBars(),pop()),sliderSpan&&(sliderSpan.innerHTML=slider.elt.value)}function windowResized(){canvasWidth=window.innerWidth,canvasHeight=window.innerHeight,resizeCanvas(canvasWidth,canvasHeight),clear(),waveform.audio&&background(backgroundColor)}function fileInput(a){"audio"!=a.type?alert("No audio file, try an audio file"):(waveform=new Waveform,waveform.audio=loadSound(a.data,function(){waveform.duration=waveform.audio.duration(),waveform.duration>1e3&&alert("Sorry, your audiofile seems too long to be processed. Try a shorter one"),waveform.setAmplitudeInput(waveform.audio),waveform.timeToDraw=!0,select("#dropzone").style("opacity","0"),select(".play").style("visibility","visible"),loop()}))}function Waveform(){this.audio=null,this.amplitude=new p5.Amplitude,this.rawAmplitudes=[],this.step=10,this.averageAmplitudes=[],this.timeToDraw=!1,this.strokeWidth=4,this.barWidth=4,this.duration=null,this.setAmplitudeInput=function(a){this.amplitude.setInput(a)},this.storeAmplitude=function(a){0!=a&&this.rawAmplitudes.push(a)},this.getAverageAmplitudes=function(){if(this.rawAmplitudes.length>this.step){this.averageAmplitudes=[];for(var a=0;a<this.rawAmplitudes.length;a+=this.step){for(var b=0,c=a;c<a+this.step;c++)b+=this.rawAmplitudes[c];var d=b/this.step;d>0&&this.averageAmplitudes.push(d)}}},this.drawBars=function(){if(this.averageAmplitudes.length>this.step){this.strokeWidth=width/this.averageAmplitudes.length/2;var a=this.strokeWidth/2;stroke("#ffffff"),strokeWeight(this.strokeWidth),noFill();for(var b=0;b<this.averageAmplitudes.length;b++){var c=map(b,0,this.averageAmplitudes.length,0,canvasWidth),d=map(this.averageAmplitudes[b],0,1,0,canvasHeight);line(c-a,-d/2,c-a,d/2)}}}}var canvasWidth=window.innerWidth,canvasHeight=window.innerHeight,waveform,slider,audioInput=null,backgroundColor="#171A1A",sliderSpan=null;
