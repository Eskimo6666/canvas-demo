var yyy =document.getElementById("xxx")
var context =yyy.getContext('2d');

autoSetCanvasSize(yyy)//自动设置canvas的宽高

listenToMouse(yyy)//鼠标监听

var eraserEnabled =false
eraser.onclick =function(){
  eraserEnabled =true
  actions.className ="actions x"
  
}    // 橡皮擦是否使用
brush.onclick =function(){
  eraserEnabled =false
  actions.className ="actions"
  
  
}
/*************/
function autoSetCanvasSize(canvas){
  setCanvasSize()

  window.onresize =function(){
     setCanvasSize()
  }

  function setCanvasSize(){
    var pageWidth =document.documentElement.clientWidth
    var pageHeight =document.documentElement.clientHeight
    canvas.width =pageWidth // width&height是属性值不是样式
    canvas.height =pageHeight  
  }  
}


function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill();
}


function drawLine(x1,y1,x2,y2){
  
  context.beginPath()
  context.fillStyle ="black"
  context.moveTo(x1,y1)  //  起点
  context.lineTo(x2,y2)// 终点
  context.lineWidth=5 
  context.stroke()
  context.closePath()
}
/***********/

function listenToMouse(canvas){
  var using=false
  var lastPoint = {x: undefined, y:undefined}
  //按下鼠标
  canvas.onmousedown =function(aaa){
    var x=aaa.clientX
    var y=aaa.clientY
    using = true
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint ={"x":x,"y":y}
    }
}


//移动鼠标
canvas.onmousemove =function(aaa){
  var x=aaa.clientX
  var y=aaa.clientY
  
  if(!using){return}
  
  if(eraserEnabled){
    context.clearRect(x-5,y-5,10,10)
  }
  else{
    using = true
    var newPoint={"x":x,"y":y}
    console.log(newPoint)
    //drawCircle(x,y,1);
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint=newPoint
  }
}

//松开鼠标
canvas.onmouseup =function(aaa){
  using=false
}
  
}