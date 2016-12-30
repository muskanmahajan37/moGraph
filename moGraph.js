var moGraph = function (canvas_name, options) {
  this.options = options;

  this.svg = "http://www.w3.org/2000/svg";
  this.canvas = document.getElementById(canvas_name);

  this.canvas.style.width = this.options.width + "px";
  this.canvas.style.height = this.options.height + "px";
};

moGraph.prototype.createNode = function (node, options) {
  var vertex = document.createElementNS(this.svg, "rect");
  vertex.setAttribute("style", "fill: #222; stroke-width: 1px;");
  vertex.setAttribute("rx", options.nodeWidth + 'px');

  var pos = this.getPos(node);

  vertex.setAttribute("x", pos.x);
  vertex.setAttribute("y", pos.y);

  vertex.setAttribute("width", options.nodeWidth + 'px');
  vertex.setAttribute("height", options.nodeWidth + 'px');

  this.canvas.appendChild(vertex);
};

moGraph.prototype.getPos = function (node) {
  var pos = {
    x: 0,
    y: 0
  };
  if (node.level === 2) {
    return {
      x: 120,
      y: 0
    }
  }
  return pos;
};

moGraph.prototype.drawLine = function (leftPos, rightPos, key) {
  var curveRadius = 12;

  if (leftPos.y === rightPos.y) {
    return '<line id="' + key + '" x1=' + leftPos.x + ' y1=' + leftPos.y + ' x2=' + rightPos.x + ' y2=' + rightPos.y + '/>';
  }
  var verticalDirection = Math.sign(rightPos.y - leftPos.y); // 1 == curve down, -1 == curve up
  var midPointX = Math.round((leftPos.x + rightPos.x) / 2);
  var w1 = midPointX - curveRadius - leftPos.x;
  var w2 = rightPos.x - curveRadius - midPointX;
  var v = rightPos.y - leftPos.y - (2 * curveRadius * verticalDirection); // Will be -ive if curve up
  var cv = verticalDirection * curveRadius;

  let pathData = 'M ' + leftPos.x + ' ' + leftPos.y
      + ' l ' + w1 + ' 0'
      + ' c ' + curveRadius + ' ' + 0  + ' ' + curveRadius  + ' ' + cv  + ' ' + curveRadius  + ' ' + cv
      + ' l 0 ' + v
      + ' c 0 ' + cv  + ' ' + curveRadius  + ' ' + cv  + ' ' + curveRadius  + ' ' + cv
      + ' l ' + w2 + ' 0';
  return '<path stroke-width="3" stroke="#949393" d="' + pathData + '" fill="none" />';
};

moGraph.prototype.draw = function () {
  var data = this.options.data;
  var options = this.options;

  for (var i = 0; i < data.length; i++) {
    this.createNode(data[i], options);
  }
  var leftPos =  {
    x: 0,
    y: 0
  };
  var rightPos = {
    x: 120,
    y: 120
  };
  let line = this.drawLine(leftPos, rightPos, 'id-5-3');
  this.canvas.appendChild(line);
};
