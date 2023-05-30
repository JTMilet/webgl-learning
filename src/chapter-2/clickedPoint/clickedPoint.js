/*
 * @Author: 杜康
 * @Date: 2023-05-30 10:38:40
 * @LastEditors: 杜康
 * @LastEditTime: 2023-05-30 18:46:09
 * @FilePath: /webgl-learning/src/chapter-2/clickedPoint/clickedPoint.js
 */
var VSHADER_SOURCE = `
    attribute vec4 a_Position;\n
    attribute float a_PointSize;\n
    void main() {\n
        gl_Position = a_Position;\n
        gl_PointSize = a_PointSize;\n
    }`

var FSHADER_SOURCE = `
    void main() {\n
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n
    }`

function main () {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get the rendering  context for WebGL')
        return
    }
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.')
        return
    }
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    // gl.vertexAttrib1f(a_PointSize, 5.0)
    // 注册鼠标点击事件
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, a_PointSize)
    }
}

var g_points = []   // 鼠标点击的位置数组
function click (ev, gl, canvas, a_Position, a_PointSize) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    console.log(x, rect.left, canvas.height)
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
    // console.log('🚀 ~ file: clickedPoint.js:48 ~ click ~ x :', x )
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
    // console.log('🚀 ~ file: clickedPoint.js:51 ~ click ~ y:', y)
    g_points.push(x)
    g_points.push(y)
    // 清空
    gl.clear(gl.COLOR_BUFFER_BIT)
    var len = g_points.length
    for (var i = 0; i < len; i += 2) {
        gl.vertexAttrib1f(a_PointSize, '5.0')
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0)
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}