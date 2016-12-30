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
mo.draw();
