const problems = {};
var st="";
var fs="";
var checkInfo=[];
var checkOption=[];
var jsonStr={
  "class": "go.GraphLinksModel",
  "nodeKeyProperty": "id",
  "nodeDataArray": [],
  "linkDataArray": []
}
var i=0;
$(document).ready(function() {
    init();
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
  alert("Bạn đã chọn điểm "+st+" làm điểm xuất phát");
});

$('#btn-start').on('click', function() {
  fs=$(".section-value-start option:selected").text();
  alert("Bạn đã họn điểm "+fs+" làm điểm đích.");
});
$('#btnReset').on('click',function(){
  for (var key in problems) {
    delete problems[key];
  } 
  jsonStr.linkDataArray=[];
  jsonStr.nodeDataArray=[];
  $(".visible-value").empty();
  $('.section-value-start').children().remove()
  $('#btn-finish').addClass('isHidden');
  $('#btn-finish').css('visibility','')
  $('#btn-start').addClass('isHidden');
  $('#btn-start').css('visibility','');  
})
$('#btnaddNode').on('click', function() {
  let name = $('input[name="node"]').val();
  let neighbor = $('input[name="neighbor"]').val();
  let length = $('input[name="length"]').val();
  let btnFs=$('#btn-finish');
  let btnSt=$('#btn-start');
  var s1=Math.floor(Math.random() * 100) + 50;
  var s2=Math.floor(Math.random() * 200) + 100;
  let str1=name+neighbor;
  let str2=neighbor+name;
  checkInfo.push(str1);
  var checkFilterInfo=checkStr(checkInfo,str2);
  $('input[name="node"]').val('');
  $('input[name="neighbor"]').val('');
  $('input[name="length"]').val('');
  if(name===''||neighbor===''||length===''){
    alert('Mời nhập đầy đủ thông tin');
  }else if(name!==''&&neighbor==='null'&&length==='null'){
    problems[name]={};
    $('.section-value-start').append('<option value="'+name+'">'+name+'</option>');
    var nameValue='{ "id":'+'"'+name+'"'+', "loc": '+'"'+s1+' '+s2+'"'+', "text":'+'"'+name+'"'+'}';
    jsonStr.nodeDataArray.push(JSON.parse(nameValue));
    console.log(jsonStr.nodeDataArray)
    console.log(jsonStr.linkDataArray)
  }else{
    if(isNaN(length)){
      alert('Hãy nhập số trong ô lenght và chữ trong ô name, neighbor');
    }else{
      if(checkFilterInfo.length!==0){
        alert('Bạn đã nhập trùng thông tin cho các node.');
      }else{
        var linkNode='{ "from":'+ '"'+name+'"'+',"to":'+'"'+neighbor+'"'+',"text":'+'"'+length+'"'+'}';
        jsonStr.linkDataArray.push(JSON.parse(linkNode));
        console.log(jsonStr.linkDataArray)
        btnFs.css('visibility','visible');
        btnSt.css('visibility','visible');
        if(problems[name] == undefined){
          problems[name]={}
        }
        if(!selectHasOption(document.querySelector('.section-value-start'), name)){
          $('.section-value-start').append('<option value="'+name+'">'+name+'</option>');
          var nameValue='{ "id":'+'"'+name+'"'+', "loc": '+'"'+s1+' '+s2+'"'+', "text":'+'"'+name+'"'+'}';
          jsonStr.nodeDataArray.push(JSON.parse(nameValue));
          console.log(jsonStr.nodeDataArray)
        }
        problems[name][neighbor] = parseInt(length)
        $(".visible-value").append(name+neighbor+"="+length+' | ');
        }
    }
   } 
    console.log(problems);
})

$('#btnres').on('click', function() {
  load();
  let modalBody=$('.modal-body');
  if(Object.keys(problems).length===0){
    modalBody.html('Mời nhập đầy đủ thông tin');
  }else{
    var res=dijkstra(problems);
    console.log(res);
    modalBody.html('Khoảng cách từ '+st+' đến '+fs+' là: '+res.distance+'<br>'+'Đường đi: '+res.path);
  }
  $('input[name="node"]').val('');
  $('input[name="neighbor"]').val('');
  $('input[name="length"]').val('');
})
}, false)

function checkStr(arr,str){
  return arr.filter(function(item){
    return str===item;
  })
}

function selectHasOption(select, value)
{
  for (i = 0; i < select.length; ++i) {
    if (select.options[i].value == value) {
       return true
    }
 }
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

  let optimalPath = [fs];
  let parent = parents[fs];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs[fs],
    path: optimalPath
  };

  return results;
};


function init() {
  if (window.goSamples) goSamples();
  var $ = go.GraphObject.make; 
  myDiagram =
    $(go.Diagram, "myDiagramDiv",
      {
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "clickCreatingTool.archetypeNodeData": { text: "new node" },
        "undoManager.isEnabled": true
      });
  myDiagram.addDiagramListener("Modified", function(e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "RoundedRectangle",
        {
          parameter1: 20,
          fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
          stroke: null,
          portId: "",
          fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
          toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
          cursor: "pointer"
        }),
      $(go.TextBlock,
        {
          font: "bold 11pt helvetica, bold arial, sans-serif",
          editable: true
        },
        new go.Binding("text").makeTwoWay())
    );
  myDiagram.nodeTemplate.selectionAdornmentTemplate =
    $(go.Adornment, "Spot",
      $(go.Panel, "Auto",
        $(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
        $(go.Placeholder) 
      ),
      $("Button",
        {
          alignment: go.Spot.TopRight,
          click: addNodeAndLink 
        },
        $(go.Shape, "PlusLine", { width: 6, height: 6 })
      )
    );

  function addNodeAndLink(e, obj) {
    var adornment = obj.part;
    var diagram = e.diagram;
    diagram.startTransaction("Add State");
    var fromNode = adornment.adornedPart;
    var fromData = fromNode.data;
    var toData = { text: "new" };
    var p = fromNode.location.copy();
    p.x += 200;
    toData.loc = go.Point.stringify(p);
    var model = diagram.model;
    model.addNodeData(toData);
    var linkdata = {
      from: model.getKeyForNodeData(fromData),
      to: model.getKeyForNodeData(toData),
      text: "transition"
    };
    model.addLinkData(linkdata);
    var newnode = diagram.findNodeForData(toData);
    diagram.select(newnode);
    diagram.commitTransaction("Add State");
    diagram.scrollToRect(newnode.actualBounds);
  }
  myDiagram.linkTemplate =
    $(go.Link, 
      {
        curve: go.Link.Bezier, adjusting: go.Link.Stretch,
        reshapable: true, relinkableFrom: true, relinkableTo: true,
        toShortLength: 3
      },
      new go.Binding("points").makeTwoWay(),
      new go.Binding("curviness"),
      $(go.Shape, 
        { strokeWidth: 1.5 }),
      $(go.Shape,  
        { toArrow: "standard", stroke: null }),
      $(go.Panel, "Auto",
        $(go.Shape,
          {
            fill: $(go.Brush, "Radial",
              { 0: "rgb(242, 242, 242)", 0.3: "rgb(242, 242, 242)", 1: "rgba(242, 242, 242, 0)" }),
            stroke: null
          }),
        $(go.TextBlock, "transition",
          {
            textAlign: "center",
            font: "9pt helvetica, arial, sans-serif",
            margin: 4,
            editable: true 
          },
          new go.Binding("text").makeTwoWay())
      )
    );
}
function save() {
  jsonStr = myDiagram.model.toJson();
}
function load() {
  myDiagram.model = go.Model.fromJson(jsonStr);
}