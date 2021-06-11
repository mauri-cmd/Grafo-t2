var nodes,edges;
var storage = new plog.storages.LocalStorage({ maxSize: 200 });
plog.useStorage(storage);
var xoptions = {
  
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" },
    
    
    }
  },
  physics: { enabled: true, wind: { x: 3, y: 0 } }
  
};
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
data = {
  nodes: nodes,
  edges: edges
};
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
///////////////////////////////////////////////////////////////////////////////////////////////
function automatainicial(){
  Swal.fire({
  title:'Que tipo de automata quiere crear',
  showCancelButton: true,
    showDenyButton: true,
  confirmButtonText:
    '<i class="AFD"></i> AFD',
  denyButtonText:
    '<i class="ANFD"></i> ANFD', 
  }).then((result) =>{
   if (result.isConfirmed) {
    var valor=estadosfinales(); 
  } else if (result.isDenied) {
    alert("escojiste ANFD")
  }
})
}
///////////////////////////////////////////////////////////////////////////////////////////////
var network = new vis.Network(container, data, options);
network.setOptions(options);
