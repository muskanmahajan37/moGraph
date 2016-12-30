var data = [
  {
    "id": 1,
    "title": "HTML"
  },
  {
    "id": 2,
    "title": "CSS"
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
mo.createNode();
mo.draw();
