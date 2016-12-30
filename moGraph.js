var moGraph = function (canvas_name, options) {
  this.options = options;
};

moGraph.prototype.createNode = function (node, options) {

  var pos = this.getPos(node);

  var posStr = ' x="' + pos.x + '" y="' + pos.y + '"';

  var rect = '<rect style="fill: #eee; stroke-width: 1px;" '
      + 'rx="' + options.nodeWidth + 'px"'
      + posStr
      + ' width="' + options.nodeWidth + 'px" height="' + options.nodeWidth + 'px"></rect>';

  var text = '<g><text><tspan xml:space="preserve" dy="1em"' + posStr + '>' + node.title + '</tspan></text></g>';

  return rect + text;
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

moGraph.prototype.drawNodePath = function (leftPos, rightPos, key) {
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

  var pathData = 'M ' + leftPos.x + ' ' + leftPos.y
      + ' l ' + w1 + ' 0'
      + ' c ' + curveRadius + ' ' + 0  + ' ' + curveRadius  + ' ' + cv  + ' ' + curveRadius  + ' ' + cv
      + ' l 0 ' + v
      + ' c 0 ' + cv  + ' ' + curveRadius  + ' ' + cv  + ' ' + curveRadius  + ' ' + cv
      + ' l ' + w2 + ' 0';
  return '<path stroke-width="3" stroke="#939393" d="' + pathData + '" fill="none" />';
};

moGraph.prototype.createNodesPath = function (data, options){
  // var lines = '';
  // var line = this.drawNodePath(leftPos, rightPos, 'id-5-3');
};

moGraph.prototype.createNodes = function (data, options) {
  var nodes = [];
  for (var i = 0; i < data.length; i++) {
      var rect = this.createNode(data[i], options);
      nodes = nodes + rect;
  }
  return nodes;
};

moGraph.prototype.draw = function () {
  var data = this.options.data;
  var options = this.options;
  var nodes = this.createNodes(data, options);
  var lines = this.createNodesPath(data, options);

  var svg = '<svg version="1.1" id="skill-tree" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1920" height="1080" xml:space="preserve">' + nodes + lines + '</svg>';

  var svgDom = document.getElementById('svg');
  svgDom.innerHTML = svg;
};
