var moGraph = function (canvas_name, options) {
  this.options = options;
  this.level = this.countLevel(data);
};

moGraph.prototype.createNode = function (node, options) {
  var pos = this.getPos(node);

  var posStr = ' x="' + pos.x + '" y="' + pos.y + '"';

  var rect = '<rect style="fill: #eee; stroke-width: 1px;" '
    + 'rx="' + options.nodeWidth + 'px"'
    + posStr
    + ' width="' + options.nodeWidth + 'px" height="' + options.nodeWidth + 'px"></rect>';

  var text = '<g><text><tspan xml:space="preserve" dy="1em"' + posStr + '>' + node.title + '</tspan></text></g>';

  node.pos = pos;
  return rect + text;
};

moGraph.prototype.countLevel = function () {
  var level = {
    count: {}
  };
  var maxLevelNumber = 1;
  for (var i = 0; i < data.length; i++) {
    var nodeLevel = data[i].level;
    if (nodeLevel) {
      if (level[nodeLevel] === undefined) {
        level[nodeLevel] = 1;
      } else {
        level[nodeLevel]++;
      }
      level.count[nodeLevel] = 0;
    }
  }
  for (var key in level) {
    if (key > 1 && level[key] > level[key - 1]) {
      maxLevelNumber = level[key];
    }
  }

  level.max = maxLevelNumber;
  return level;
};


moGraph.prototype.getPos = function (node) {
  var levelInfo = this.level;
  var maxLevel = this.level.max;

  function currentLevelCount(level) {
    return levelInfo[level];
  }

  var pos = {
    x: (node.level - 1) * 150,
    y: (maxLevel - currentLevelCount(node.level)) / 2 * 150 + this.level.count[node.level] * 150
  };

  this.level.count[node.level]++;

  return pos;
};

moGraph.prototype.drawNodePath = function (leftPos, rightPos, key) {
  var curveRadius = 12;

  if (leftPos.y === rightPos.y) {
    return '<line stroke-width="3" stroke="#939393" id="' + key + '" x1=' + leftPos.x + ' y1=' + leftPos.y + ' x2=' + rightPos.x + ' y2=' + rightPos.y + ' />';
  }
  var verticalDirection = Math.sign(rightPos.y - leftPos.y); // 1 == curve down, -1 == curve up
  var midPointX = Math.round((leftPos.x + rightPos.x) / 2);
  var w1 = midPointX - curveRadius - leftPos.x;
  var w2 = rightPos.x - curveRadius - midPointX;
  var v = rightPos.y - leftPos.y - (2 * curveRadius * verticalDirection); // Will be -ive if curve up
  var cv = verticalDirection * curveRadius;

  var pathData = 'M ' + leftPos.x + ' ' + leftPos.y
    + ' l ' + w1 + ' 0'
    + ' c ' + curveRadius + ' ' + 0 + ' ' + curveRadius + ' ' + cv + ' ' + curveRadius + ' ' + cv
    + ' l 0 ' + v
    + ' c 0 ' + cv + ' ' + curveRadius + ' ' + cv + ' ' + curveRadius + ' ' + cv
    + ' l ' + w2 + ' 0';
  return '<path stroke-width="3" stroke="#939393" d="' + pathData + '" fill="none" />';
};

moGraph.prototype.createNodesPath = function (data, options) {
  var lines = '';
  for (var i = 0; i < data.length; i++) {
    var currentNode = data[i];

    if (currentNode.deps && currentNode.deps.length > 0) {
      for (var j = 0; j < currentNode.deps.length; j++) {
        var depNodeId = currentNode.deps[j];
        var depNode = data[depNodeId - 1];


        var leftPos = {
          x: depNode.pos.x + options.nodeWidth / 2,
          y: depNode.pos.y + options.nodeWidth / 2
        };
        var rightPos = {
          x: currentNode.pos.x + options.nodeWidth / 2,
          y: currentNode.pos.y + options.nodeWidth / 2
        };
        var line = this.drawNodePath(leftPos, rightPos, 'id-' + currentNode.id + '-' + depNode.id);
        lines = lines + line;
      }
    }
  }

  return lines;
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

  return svg;
};
