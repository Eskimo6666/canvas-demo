var yyy = document.getElementById("xxx")
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)//自动设置canvas的宽高

listenToUser(yyy)//鼠标监听

var eraserEnabled = false
pen.onclick =function(){
    eraserEnabled =false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick =function(){
    eraserEnabled =true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick =function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}

save.onclick =function(){
    var url=yyy.toDataURL("imge/png")
    console.log(url)
    var a =document.createElement('a')
    document.body.appendChild(a)
    a.href =url
    a.download ="我的画"
    a.target='_blank'
    a.click()
}
red.onclick =function(){
    context.strokeStyle ='red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.move('active')

}
green.onclick =function(){
    context.strokeStyle ='greenyellow'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    
}
blue.onclick =function(){
    context.strokeStyle ='blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
}

thin.onclick =function(){
    lineWidth = 5
}

thick.onclick =function(){
    lineWidth = 10
}
//eraser.onclick = function () {
 //   eraserEnabled = true
 //   actions.className = "actions x"

//}    // 橡皮擦是否使用
//brush.onclick = function () {
 //   eraserEnabled = false
 //   actions.className = "actions"


//}
/*************/
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth // width&height是属性值不是样式
        canvas.height = pageHeight
    }
}


function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill();
}


function drawLine(x1, y1, x2, y2) {

    context.beginPath()
    context.fillStyle = "black"
    context.moveTo(x1, y1)  //  起点
    context.lineTo(x2, y2)// 终点
    context.lineWidth = lineWidth
    context.stroke()
    context.closePath()
}
/***********/

function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
   // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏端
        canvas.ontouchstart = function (aaa) {
            //console.log(aaa)
            console.log('开始摸我了')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
    
    
        canvas.ontouchmove = function (aaa) {
            console.log('边摸变动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            }
            else {
                using = true
                var newPoint = { "x": x, "y": y }
                //console.log(newPoint)
                //drawCircle(x,y,1);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    
        canvas.ontouchend = function () {
            console.log('摸完了')
            using=false
        }

    } else {
        // 非触屏设备
         //按下鼠标
        canvas.onmousedown = function (aaa) {

            var x = aaa.clientX
            var y = aaa.clientY



            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }


        //移动鼠标
        canvas.onmousemove = function (aaa) {

            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            }
            else {
                using = true
                var newPoint = { "x": x, "y": y }
                //console.log(newPoint)
                //drawCircle(x,y,1);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        //松开鼠标
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}

