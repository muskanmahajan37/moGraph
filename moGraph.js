var moGraph = function (canvas_name, options) {
  this.options = options;

  this.svg = "http://www.w3.org/2000/svg";
  this.canvas = document.getElementById(canvas_name);

  this.canvas.style.width = this.options.width + "px";
  this.canvas.style.height = this.options.height + "px";
};

moGraph.prototype.createNode = function () {
  var vertex = document.createElementNS(this.svg, "rect");
  vertex.setAttribute("style", "fill: #222; stroke-width: 1px;");
  vertex.setAttribute("rx", this.options.nodeWidth + 'px');

  vertex.setAttribute("width", this.options.nodeWidth + 'px');
  vertex.setAttribute("height", this.options.nodeWidth + 'px');

  this.canvas.appendChild(vertex);
};

moGraph.prototype.drawNode = function () {

};

moGraph.prototype.createEdge = function () {

};

moGraph.prototype.updateLayout = function () {

};

moGraph.prototype.drawLine = function () {

};

moGraph.prototype.draw = function () {

};
