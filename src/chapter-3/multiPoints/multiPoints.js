/*
 * @Author: 杜康
 * @Date: 2023-05-30 10:38:40
 * @LastEditors: 杜康
 * @LastEditTime: 2023-06-01 17:18:14
 * @FilePath: /webgl-learning/src/chapter-3/multiPoints/multiPoints.js
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
    var n = initVertexBuffers(gl)
    if (n < 0) {
        console.log('Failed to set positions of the vertices')
        return
    }
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // 清空
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    var n = 3
    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        return -1
    }
    // 将缓冲区对象绑定到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 5.0)
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 连接a_Positiona_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)
    return n
}