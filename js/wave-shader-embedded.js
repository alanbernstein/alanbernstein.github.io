const canvas = document.getElementById("shader-canvas");
const gl = canvas.getContext("webgl");

// webgl boilerplate
gl.viewport(0,0,canvas.width, canvas.height);
const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, document.getElementById('vertex-shader').innerText);
gl.compileShader(vertShader);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, document.getElementById('fragment-shader').innerText);
gl.compileShader(fragShader);
if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragShader));
}
const prog = gl.createProgram();
gl.attachShader(prog, vertShader);
gl.attachShader(prog, fragShader);
gl.linkProgram(prog);
gl.useProgram(prog);
const vertBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,  -1,-1,  1,-1, 1,1]), gl.STATIC_DRAW);
const coordPtr = gl.getAttribLocation(prog, 'coord');
gl.vertexAttribPointer(coordPtr, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordPtr);
gl.clearColor(1,0,0,1);

// setup uniform variables
const millisecsPtr = gl.getUniformLocation(prog, 'millisecs');
const orderPtr = gl.getUniformLocation(prog, 'order');
const widthPtr = gl.getUniformLocation(prog, 'width');
const scalePtr = gl.getUniformLocation(prog, 'scale');
const speedPtr = gl.getUniformLocation(prog, 'speed');
const start = new Date().getTime();

// render in loop
function draw() {
    var order = document.getElementById("slider-order").value
    document.getElementById("label-order").innerHTML = order;
    var width = 60
    var scale = 5
    var speed = 1

    gl.uniform1f(millisecsPtr, (new Date().getTime())-start);
    gl.uniform1f(orderPtr, order);
    gl.uniform1f(widthPtr, width);
    gl.uniform1f(scalePtr, scale);
    gl.uniform1f(speedPtr, speed);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

