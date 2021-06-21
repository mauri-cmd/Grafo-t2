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
 if(cantidadautomatas==2){
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
  icon: 'warning',
  title: 'cantidad maxima de automatas alcanzada'
})
   
     return;
   }cantidadautomatas++;
 alfabetoentrada().then((total)=> { 
 console.log(alfabeto);
 estadostotales().then((valor)=> { 
 console.log(estados);
 estadosfinales(valor-1).then((valor)=>{
  var q=añadirestadoinicial();
  for(let i=0;i<finales;i++){
    añadirestadofinal(); 
    }  
  for(let i=0;i<(estados-1-finales);i++){
    añadirestadonormal(); 
    } 
         
estados=estados-0;
         
agregar(alfabeto,q,estados);   
       });      
});
});
}
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

function recorrer(automata,text){
  console.log(text);
  //var text="abbbabdh";
  var palabra=[];
  var estadosf=estadosfinalesvector(automata);
  var estadosn=estadosnormalesvector(automata);
  var estadoi=estadoinicial(automata);
  var arista = edges.get();
  var aristasinicial = arista.filter(arista => arista.from == estadoi.id);
  var total=(estadosf.length+estadosn.length+1)*aristasinicial.length;
  //console.log("automata 1= total",total," finales",estadosf.length,"normales",estadosn.length,"inicial",estadoi.label);
  var vecttexto=[];
  var recorre;
  var opcioneslabel=[];
  var totalopciones=[];
  var opcionesf=[];
  var arista = edges.get();
  var inicialaux;//poner un if para parar los for si se esta recorriendo el automata1
  var aux;
  var cont=0;
  if(automata==2){
    inicialaux=qinicial2;
  }
  for(let i of text) {
    vecttexto.push(i);
}
  var cont=0;
  for(let t=0;t<vecttexto.length;t++){
   for(let m=0;m<aristasinicial.length;m++){
  if(vecttexto[t]==aristasinicial[m].label){
    cont++;
    break;
  }else{
    for(let o=0;o<aristasinicial[m].label.length;o++){
    if(vecttexto[t]==aristasinicial[m].label[o]){
      cont++;
      break;
    }
  }
  }
  
} 
  }
  if(cont!=vecttexto.length){
    alert("f");
    return;
  }
  

  for(let j=0;j<aristasinicial.length;j++){
    //console.log(aristasinicial[j].label);
  if(vecttexto[0]==aristasinicial[j].label){
    recorre=aristasinicial[j];
  }
  }
  console.log(recorre);
  
       for(let i=0;i<aristasinicial.length;i++){
    console.log(vecttexto[0]);
         if(1<aristasinicial[i].label.length){
           for(let j=0;j<aristasinicial[i].label.length;j++){
             if(vecttexto[0]==aristasinicial[i].label[j]){
    recorre=aristasinicial[i];
           }
         }
             
  }       
  }  
   
  console.log(recorre);
  if(recorre==undefined){
    //alert("f");
    return;
  }
  console.log(vecttexto[0]);
  console.log("inicial",recorre.label);
  console.log("--------------------------------------");
  for (let i = 0; i < vecttexto.length; i++) {
    console.log("global",recorre);
      if(recorre.label.length>1){
          for(let j=0;j<recorre.label.length;j++){
          if(recorre.label[j]==vecttexto[i]){
            console.log("de "+recorre.from+" hasta "+recorre.to+"////"+recorre.label,"==",vecttexto[i]);
    aux=arista.filter(arista => arista.from == recorre.to);
            break;
          }
        }
        
      }else if(recorre.label==vecttexto[i]){
    console.log("de",recorre.to,recorre.label,"==",vecttexto[i]);
    aux=arista.filter(arista => arista.from == recorre.to);
              }
    console.log("segunda fase",aux);
    for(let k=0;k<aux.length;k++){
     // console.log("aux:",aux[k],k);
     // console.log("letra del texto",vecttexto[i]," label ",aux[k].label);
     if(vecttexto[i+1]!=undefined){
     
      if(aux[k].label==vecttexto[i+1]){
        recorre=aux[k];
        console.log("recorre=",recorre.label);
        break;
      }else{
        if(aux[k].label.length>1){
		      for(let n=0;n<aux[k].label.length;n++){
            console.log(n,"aux[k].label.length=",aux[k].label.length);
	    	    if(aux[k].label[n]==vecttexto[i+1]){
              console.log("multiple",aux[k].label[n],"==",vecttexto[i]);
              recorre=aux[k];
              break;
            }
            console.log("recorre=",recorre.label,"de",recorre.from);
              
	    	     }
          }
          
        }
     }
      
      }
    
 }
    for(let l=0;l<estadosf.length;l++){
      if(recorre.to==estadosf[l].id){
        console.log("palabra admitida");
        cont++;
      }
    }
    if(cont==0){
      console.log("la palabra no es admitida");
    }
    console.log("termina",recorre.to);
    
  
  
  

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
function añadirestadonormal(){
  
  plog.info('Se añade un estado normal');
  var Label = "q";
  nodes.add([{ id: ID, label: Label + ID}]);
  ID++;
}
function estadoinicial(automata){
  var nodos=nodes.get();
  var automata1;
  var automata2;
 
  var cont=0;
  for(let i=0;i<nodos.length;i++){
  //  console.log("cont=",cont, nodos[i].color," == ","#C2FABC");
    
    if(nodos[i].color=="#C2FABC"){
      cont++;
      if(cont==1){
        automata1=nodos[i];
        console.log("adentro");
      }
      if(cont==2){
        automata2=nodos[i];
        
      }
    }  
  }
  if(automata==1){
    return automata1;
  }
  if(automata==2){
    return automata2;
  }
}
  function estadosnormalesvector(automata){
    var nodos=nodes.get();
  var automata1;
  var automata2;
  var nautomata2;
  var cont=0;
  var vectornormales=[];
  for(let i=0;i<nodos.length;i++){
    //console.log("cont=",cont, nodos[i].color," == ","#C2FABC");
    
    if(nodos[i].color=="#C2FABC"){
      cont++;
      if(cont==1){
        automata1=nodos[i];
      //  console.log("adentro");
      }
      if(cont==2){
        automata2=nodos[i];
        nautomata2=i;
      }
    }  
  }
    if(automata==1){
    //console.log("aqui");
    for(let i=0;i<nodos.length;i++){
      //console.log("ñe");
      if(nodos[i]==automata2){
        break;
      }
      if(nodos[i].color==undefined)
      vectornormales.push(nodos[i]);
      }
    
     return vectornormales;
  }else{
    if(automata==2){
      for(let i=1;i<=nodos.length;i++){
       if(nodos[i]=[]){
         break;
       } 
        if(nodos[nautomata2+i].color==undefined)
       vectornormales.push(nodos[nautomata2+i]); 
      }
      
     return vectornormales;
    }
  }
  }
function estadosfinalesvector(automata){
  var nodos=nodes.get();
  var automata1;
  var automata2;
  var nautomata2;
  var cont=0;
  var vectorfinales=[];
  for(let i=0;i<nodos.length;i++){
    //console.log("cont=",cont, nodos[i].color," == ","#C2FABC");
    
    if(nodos[i].color=="#C2FABC"){
      cont++;
      if(cont==1){
        automata1=nodos[i];
      //  console.log("adentro");
      }
      if(cont==2){
        automata2=nodos[i];
        nautomata2=i;
      }
    }  
  }
  if(automata==1){
    //console.log("aqui");
    for(let i=0;i<nodos.length;i++){
      //console.log("ñe");
      if(nodos[i]==automata2){
        break;
      }
      if(nodos[i].color=="#fabcbc")
      vectorfinales.push(nodos[i]);
      }
    
     return vectorfinales;
  }else{
    if(automata==2){
      for(let i=1;i<=nodos.length;i++){
       if(nodos[i]=[]){
         break;
       } 
        if(nodos[nautomata2+i].color=="#fabcbc")
       vectorfinales.push(nodos[nautomata2+i]); 
      }
      
     return vectorfinales;
    }
  }
}
function verificar(finales,inicial,normales,alfabeto){
  var total=alfabeto*(normales.length+finales.length+1);
  var nodos=nodes.getIds();
  var totales=nodes.get();
  var arista=edges.get();
  var cont =0;
  var contrecorrido=0;
  var recorre;
  var aux;
  var aristasinicial=arista.filter(arista => arista.from == inicial.id);
  
  console.log("total",total,"inicial",inicial,"aristasinicial",aristasinicial[0]);
  for(let i=0;i<finales.length;i++){
    
   // vectorprueba.push(inicial.id);
    for(let j=0;j<aristasinicial.length;j++){
       recorre=aristasinicial[j];
      console.log(recorre.label);
      var vectorprueba=[inicial.id];
      for(let k=0;k<alfabeto;k++){
        for(let l=0;l<total;l++){
          if(recorre.to==finales[i].id){
          cont++;
            vectorprueba.push(recorre.to);
          break;
          }else if(recorre.to==recorre.from){
            aux=arista.filter(arista => arista.from == recorre.to);
             recorre=aux[k];
            console.log("aux",aux[k]);
             break;//provicional
          }else{
           //console.log(recorre);
          vectorprueba.push(recorre.to);
           aux=arista.filter(arista => arista.from == recorre.to);
           recorre=aux[k];
           //console.log(recorre);
          }
      
        }
      
      
        console.log(finales[i].id,"==" ,vectorprueba )
    }
    if(recorre.to==finales[i].id){ 
      vectorprueba.push(recorre.to);
      
      break;
    }     
       
   }
   console.log("estado",finales[i].label ,"==",vectorprueba);
 }
    console.log("contador",cont);
  //console.log("recorrido hasta el estado ",finales[i].label," es: ",vectorprueba);
  
  if(cont<totales){
    alert('no se cumplen las condiciones');
  }
}
function aristarepetida(contadoraristas){
  for (var i = 0; i < contadoraristas.length; i++) {
    if(contadoraristas[i].from==contadoraristas[i].to){
      return true;
      break
    }
  }
  return false;
}
function conectar(desde, hasta, label) {
  var aristas = edges.get();
  var contadoraristas = aristas.filter(aristas => aristas.from == desde);
  if(desde==hasta&&contadoraristas!=0&&aristarepetida(contadoraristas)==true){
        for (var i = 0; i < contadoraristas.length; i++) {
          if(contadoraristas[i].from==contadoraristas[i].to){
 var obtenerid=contadoraristas[i].id;
            var obtenerlabel=contadoraristas[i].label;
        
          }
        }
console.log("id="+obtenerid+"///////"+"label="+obtenerlabel+","+label);
 edges.updateOnly({id:obtenerid,label:obtenerlabel+","+label});
}else{
   contadoraristas = contadoraristas.length + 1;
  edges.add([
    {
      id: desde + "-" + contadoraristas,
      from: desde,
      to: hasta,
      label: label
    }
  ]);
  return;
}

  

}

    
 
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
