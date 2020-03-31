let drawlineCallCount = 0;

var drawLine = function(x0, y0, x1, y1) {
  drawlineCallCount++;
  console.log(`There is a line from: ${x0},${y0},and, ${x1},${y1}`);
};

function drawHtree(x, y, l, d) {
  drawLine()

  if (d >=0 ) {
    let x0 = x - l / 2;
    let x1 = x + l / 2;
    let y0 = y - l / 2;
    let y1 = y + l / 2;

    drawLine(x0, y1, x0, y0);
    drawLine(x0, y, x1, y);
    drawLine(x1, y1, x1, y0);
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');

    let newLength = l / Math.sqrt(2);
    
    drawHtree(x0, y0, newLength, d - 1);
    drawHtree(x1, y0, newLength, d - 1);
    drawHtree(x0, y1, newLength, d - 1);
    drawHtree(x1, y1, newLength, d - 1);
  }
}

drawHtree(0, 0, 7, 3);

console.log(drawlineCallCount);