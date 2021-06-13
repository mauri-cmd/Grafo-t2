//variables globales

var nodes,edges,ID=4,y=0;
var estados,alfabeto,transicion,inicial,finales;
var automata1 = [];
var automata2 = [];

///////////////////////////////////////////////
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
  { id: 1, label: "q1", color:"#C2FABC",fixed:{x:true}},
  { id: 2, label: "q2",color:"#fabcbc" },
  { id: 3, label: "q3"},

]);
var o_nodes = new vis.DataSet(nodes);
//crear un array con las aristas
edges = new vis.DataSet([
  {id: "1-1", from:1,to:2, label:"a"},
  {id: "1-2", from:1,to:3, label:"b"},
  {id: "2-1", from:2,to:2,label:"a"},
  {id: "2-2", from:2,to:1,label:"b"},
  {id: "3-1", from:3,to:3,label:"a"},
  {id: "3-2", from:3,to:3, label:"b"},
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
//se escoje que tipo de automata se quiere crear
function automatainicial(){
  Swal.fire({
  title:'Que tipo de automata quiere crear',
  showCancelButton: true,
    showDenyButton: true,
  confirmButtonText:
    '<i class="AFD"></i> AFD',
  denyButtonText:
    '<i class="ANFD"></i> AFND', 
  }).then((result) =>{
   if (result.isConfirmed) {
    crearAFD();
  } else if (result.isDenied) {
    crearAFND(); 
  }
})
}
function crearAFD(){
  //(async() => {
 alfabetoentrada().then((total)=> { 
   console.log(alfabeto);
    estadostotales().then((valor)=> { 
    console.log(estados);
       estadosfinales(valor-1).then((valor)=>{
         añadirestadoinicial();
    for(let i=0;i<finales;i++){
    añadirestadofinal();
    }   
       });      
});
});
//se escoje la cantidad total del alfabeto en el automata
async function alfabetoentrada(){
  
  const { value: total } = await Swal.fire({
  title: 'Tamaño de alfabeto',
  input: 'range',
  inputAttributes: {
    min: 2,
    max: 5,
    step: 1
  },
  inputValue: 2
  
})
//alert(total);
alfabeto=total;
//alert(alfabeto);

return total;
}
//se escoje la cantidad de estados en el automata
async function estadostotales(){

  const { value: valor } = await Swal.fire({
  title: 'Cantidad de estados totales',
  input: 'range',
  inputAttributes: {
    min: 2,
    max: 10,
    step: 1
  },
  inputValue: 2
  
})
//alert(valor);
  estados=valor;
return valor;

 
}
  
 async function estadosfinales(rango){

  const { value: valor } = await Swal.fire({
  title: 'Cantidad de estados finales',
  input: 'range',
  inputAttributes: {
    min: 1,
    max: rango,
    step: 1
  },
  inputValue: 1
  
})
//alert(valor);
  finales=valor;
return valor;

 
} 
 //borra el automata completo
function borrar(){ 
var borrar = nodes.getIds();
if(borrar.length==0){
  plog.warn("Se intento eliminar un automata cuando no hay ninguno,se cancela la operacion y se manda alerta ");
Swal.fire({
  icon: 'warning',
  title: 'Error...',
  text: 'Para eliminar los automatas,agreguelos primero',
})
return;
}
  plog.info("Se elimina el nodo junto con todas sus aristas ");
 for (var i = 0; i < borrar.length; i++){
     nodes.remove(borrar[i]);
   var aristas = edges.get();
  var contadoraristas = aristas.filter(aristas => aristas.from == borrar[i]);

  var x = contadoraristas.length;
  console.log(contadoraristas);
  while (x != 0) {
    edges.remove(contadoraristas[x - 1].id);
    x = x - 1;
  }
   
   console.log(edges.get());
   ID=1;
 }
 
 const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Se han borrado los automatas'
})
   
 }
  
function complemento(){
    Swal.fire({
  title:'Que tipo de automata quiere crear',
  showCancelButton: true,
    showDenyButton: true,
  confirmButtonText:
    '<i class="automata 1"></i> automata 1',
  denyButtonText:
     '<i class="automata 2"></i> automata 2', 
  }).then((result) =>{
   if (result.isConfirmed) {
  var automata=nodes.getIds();
      for (var i = 0; i < automata.length; i++){
        var obtener=automata[i];
        if(nodes.get(obtener).color=="#C2FABC"){
          nodes.updateOnly({id: obtener, color:"#fabcbc"});        
        }else if(nodes.get(obtener).color=="#fabcbc"){
          nodes.updateOnly({id: obtener, color:"#C2FABC"});          
        }
      }
  } else if (result.isDenied) {
   
    
    
  }
})
  }
function añadirestadoinicial(){
  plog.info('Se añade un estado inicial');
  var Label = "q";
  nodes.add([{ id: ID, label: Label + ID, color:"#C2FABC",fixed:{x:true,y:y}}]);
  ID++;
  y=y-2;

}
function añadirestadofinal(){
  plog.info('Se añade un estado final');
  var Label = "q";
  nodes.add([{ id: ID, label: Label + ID, color:"#fabcbc"}]);
  ID++;
}

function conectar(desde,hasta,label){
  var aristas = edges.get();
    var contadoraristas = aristas.filter(
      aristas => aristas.from == desde
    );
    
 
      contadoraristas = contadoraristas.length + 1;
      edges.add([
        {
          id:
           desde+
            "-" +
            contadoraristas,
          from: desde,
          to: hasta,
          label: label
        }
      ]);
      return;
} 
  
///////////////////////////////////////////////////////////////////////////////////////////////
var network = new vis.Network(container, data, options);
network.setOptions(options);
