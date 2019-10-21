const problems = {};


var st="";
var fs="";
$(document).ready(function() {
    var nut = document.querySelectorAll('.chuyensilde ul li');
    var slides=document.querySelectorAll('.cacslide ul li');
    var tg=setInterval(function(){
        autosilde();
    },4000);
    for (let index = 0; index < nut.length; index++) {
        nut[index].addEventListener('click', function (){
            for (let index = 0; index < nut.length; index++) {
                nut[index].classList.remove('kichhoat');
            }
            this.classList.add('kichhoat');
            var nutkichhoat=nut[index];
            var vtrinut=0;
            for (vtrinut = 0; nutkichhoat = nutkichhoat.previousElementSibling; vtrinut++) {
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[vtrinut].classList.add('active');
            }
        });
    }
    function autosilde(){
            var vtrislide=0;
            var slidehientai=document.querySelector('.cacslide ul li.active');
              for (vtrislide = 0; slidehientai = slidehientai.previousElementSibling; vtrislide++) {}
              if(vtrislide < slides.length-1){
              for (let i = 0; i < slides.length; i++) {
                 slides[i].classList.remove('active');
                 nut[i].classList.remove('kichhoat');
              }
              slides[vtrislide].nextElementSibling.classList.add('active');
              nut[vtrislide].nextElementSibling.classList.add('kichhoat');
          }else{
              vtrislide=0
              for (let i = 0; i < slides.length; i++) {
                  slides[i].classList.remove('active');
                  nut[i].classList.remove('kichhoat');
               }
               slides[vtrislide].classList.add('active');
               nut[vtrislide].classList.add('kichhoat');
          }
  }

  
  var menubar = document.querySelector('.menu-bar');
  var homemenu= document.querySelector('.home-menu');
  menubar.addEventListener('click',function(){
    homemenu.classList.toggle("hienmenuhome");
    menubar.style.zIndex=501;
  })

$('#btn-finish').on('click', function() {
  st=$(".section-value-start option:selected").text();
  alert(st);
});

$('.section-value-finish').on('change', function() {
  fs=$(".section-value-finish option:selected").text();
});

$('button').on('click', function() {
  let name = $('input[name="node"]').val();
  let neighbor = $('input[name="neighbor"]').val();
  let length = $('input[name="length"]').val();
  if(problems[name] == undefined){
    problems[name]={}
  }
  problems[name][neighbor] = parseInt(length)
  $(".visible-value").append(name+neighbor+"="+length);
  $('.section-value-start').append('<option value="'+name+'">'+name+'</option>');
  $('.section-value-finish').append('<option>'+name+'</option>');
  console.log(problems);
})

$('#btn').on('click', function() {
  console.log(dijkstra(problems));
})
  }, false)

  function bestCopyEver(src) {
    return Object.assign({}, src);
  }

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};


const dijkstra = (graph) => {
  const costs = Object.assign({finish: Infinity}, graph[st]);
  const parents = {finish: null};
  for (let child in graph[st]) {
    parents[child] = st;
  }
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs.finish,
    path: optimalPath
  };

  return results;
};

// var obj={}
// obj["start"]={}
// obj={
//   start:{}
// }
// obj["start"][a]=5
// obj={
//   start:{a:5}
// }
