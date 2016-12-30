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

moGraph.prototype.drawLine = function () {

};

moGraph.prototype.draw = function () {
  var data = this.options.data;
  var options = this.options;

  for (var i = 0; i < data.length; i++) {
    this.createNode(data[i], options);
  }
};
