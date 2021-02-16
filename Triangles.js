"use strict";

let gl; 
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }
    colors = [];
    points = [];

    //using these variables because I edited previous file
    let x = 0
    let y = 0 
    let dx = 5
    let dy = 7
    let r = 0
    let g = 100
    let b = 60
    let pt0 = vec2(x,y);
    let pt1 = vec2(x, y+dy);
    let pt2 = vec2(x+dx, y);
    let pt3 = vec2(-1,-1);
    let pt4 = vec2(x+0.1, y+0.1);
    let pt5 = vec2(x+dx, y+dy);
    let pt6 = vec2(0,-1);
    let pt7 = vec2(-1, 0);
    let pt8 = vec2(0.5, -0.5);
    let pt9 = vec2(-1,-1);

    let color = vec3(r,g,b);
    let color2 = vec3(b, g, r);
    
    drawSolidTriangles(pt0, pt1, pt2, color); //solid triangles
    drawSolidTriangles(pt0, pt2, pt3, color2);
    drawSolidTriangles(pt0, pt3, pt4, color);
    drawSolidTriangles(pt0, pt4, pt5, color);
    drawSolidTriangles(pt1, pt3, pt5, color2);
    drawSolidTriangles(pt0, pt2, pt4, color);

    
    drawWackyTriangles(pt6, pt7, pt9); //multicolor triangles
    drawWackyTriangles(pt8, pt7, pt6);

    let pt10 = vec2(-0.5, 0);
    let pt11 = vec2(-0.7, 0.2);
    let pt12 = vec2(-0.6, 0.4);
    let pt13 = vec2(-0.7, -0.2);
    let color3 = vec3(0, 0, 40);

    drawSolidTriangles(pt10, pt11, pt12, color3); //more solids that I added after
    drawSolidTriangles(pt10, pt13, pt12, color3);




    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .9, .9, .9, 1.0 ); //slight grey

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};


function drawSolidTriangles(pt0, pt1, pt2, color) { //draws solid triangels with vertuces at points
    points.push(pt0);
    points.push(pt1);
    points.push(pt2);

    colors.push(color);
    colors.push(color);
    colors.push(color);
}

function drawWackyTriangles(pt0, pt1, pt2) { // draws multicolor triangles
    points.push(pt0);
    points.push(pt1);
    points.push(pt2);

    let transform = vec3(20,0,20);
    let transform2 = vec3(0,40, 40);
    
    colors.push(transform);
    colors.push(transform2);
    colors.push(transform);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}
