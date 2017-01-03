var data = [
  {
    "id": 1,
    "level": 1,
    "title": "HTML"
  },
  {
    "id": 2,
    "level": 2,
     "deps": ["1"],
    "title": "CSS"
  },
  {
    "id": 3,
    "level": 2,
    "deps": ["1"],
    "title": "JS"
  },
  {
    "id": 4,
    "level": 3,
    "deps": ["2"],
    "title": "jQuery"
  }
];

var options = {
  data: data,
  nodeWidth: 100,
  width: 1920,
  height: 1080,
  color: '#3dfefe'
};

var mo = new moGraph('skill-tree', options);
var svg = mo.draw();
var svgDom = document.getElementById('svg');
svgDom.innerHTML = svg;
