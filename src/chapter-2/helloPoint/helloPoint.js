/*
 * @Author: 杜康
 * @Date: 2023-05-30 10:38:40
 * @LastEditors: 杜康
 * @LastEditTime: 2023-05-30 10:57:46
 * @FilePath: /webgl-learning/src/chapter-2/helloPoint/helloPoint.js
 */
var VSHADER_SOURCE = `void main() {\n
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n
    gl_PointSize = 10.0;\n
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
    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // 清空
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}