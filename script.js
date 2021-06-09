var nodes,edges;
var storage = new plog.storages.LocalStorage({ maxSize: 200 });
plog.useStorage(storage);
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges
};
nodes = new vis.DataSet([
  { id: 1, label: "q1" },
  { id: 2, label: "q2" },
  { id: 3, label: "q3" },
  { id: 4, label: "q4" },
  { id: 5, label: "q5" }
]);
var o_nodes = new vis.DataSet(nodes);
//crear un array con las aristas
edges = new vis.DataSet([
  {id: "1-1", from:1,to:3, label:"p"},
  {id: "1-3", from:1,to:4, label:"i"},
  {id: "1-2", from:2,to:5, label:"c"},
  {id: "2-1", from:1,to:2,label:"o"}
]);
var options = {
  manipulation: {
    enabled: true,
    addNode: false,
    addEdge: false,
    editEdge: false,
    deleteNode: false,
    deleteEdge: true,

  }
};
data = {
  nodes: nodes,
  edges: edges
};
var network = new vis.Network(container, data, options);
network.setOptions(options);