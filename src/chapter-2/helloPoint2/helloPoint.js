/*
 * @Author: 杜康
 * @Date: 2023-05-30 10:38:40
 * @LastEditors: 杜康
 * @LastEditTime: 2023-05-30 18:09:42
 * @FilePath: /webgl-learning/src/chapter-2/helloPoint2/helloPoint.js
 */
var VSHADER_SOURCE = `
    attribute vec4 a_Position;\n
    attribute float a_PointSize;\n
    void main() {\n
    gl_Position = a_Position;\n
    gl_PointSize = a_PointSize;\n
}`

var FSHADER_SOURCE = `void main() {\n
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
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 5.0)
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // 清空
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}