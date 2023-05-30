/*
 * @Author: 杜康
 * @Date: 2023-05-30 09:30:44
 * @LastEditors: 杜康
 * @LastEditTime: 2023-05-30 10:27:10
 * @FilePath: /webgl-learning/src/chapter-1/helloCanvas/helloCanvas.js
 */
function main () {
    var canvas = document.getElementById('webgl');
    // 获取webgl绘图上下文
    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get the rendering  context for WebGL')
        return
    }
    // 清空canvas的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)
}