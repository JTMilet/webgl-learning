/*
 * @Author: 杜康
 * @Date: 2023-05-30 10:38:40
 * @LastEditors: 杜康
 * @LastEditTime: 2023-06-01 09:29:56
 * @FilePath: /webgl-learning/src/chapter-2/coloredPoint/coloredPoint.js
 */
// 顶点着色器
var VSHADER_SOURCE = `
    attribute vec4 a_Position;\n
    attribute float a_PointSize;\n
    void main() {\n
        gl_Position = a_Position;\n
        gl_PointSize = a_PointSize;\n
    }`

// 片元着色器
var FSHADER_SOURCE = `
    precision mediump float;\n
    uniform vec4 u_FragColor;\n
    void main() {\n
        gl_FragColor = u_FragColor;\n
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
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    // gl.vertexAttrib1f(a_PointSize, 5.0)
    // 注册鼠标点击事件
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor);
    }
}

var g_points = []   // 鼠标点击的位置数组
var g_colors = [] // 存储点颜色的数组
function click (ev, gl, canvas, a_Position, a_PointSize, u_FragColor) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    console.log(x, rect.left, canvas.height)
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
    // console.log('🚀 ~ file: clickedPoint.js:48 ~ click ~ x :', x )
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
    // console.log('🚀 ~ file: clickedPoint.js:51 ~ click ~ y:', y)
    g_points.push([x, y])
    if (x >= 0.0 &&  y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    // 清空
    gl.clear(gl.COLOR_BUFFER_BIT)
    var len = g_points.length
    for (var i = 0; i < len; i++) {
        var xy = g_points[i]
        var rgba = g_colors[i]
        gl.vertexAttrib1f(a_PointSize, '5.0')
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0)
        gl.uniform4f(u_FragColor,rgba[0], rgba[1], rgba[2], rgba[3])
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}