$(document).ready(function(){
  let dataType1 = [
    {
        'id' : '0',
        'text' : 'Root',
        'state' : { 'opened' : false, 'selected' : true },
        'children' : true
    },
    {
      'id' : '1',
      'text' : 'Root2',
      'state' : { 'opened' : true },
      'children' : true
    }
  ]
  let dataTypeSingle = {
      'id' : '0',
      'text' : 'Root',
      'state' : { 'opened' : false, 'selected' : true },
      'children' : true
  }
  let dataType2 = function(obj, callback){
    console.log('the node being loaded and a callback function to call with the children for that node once you are ready.')
    console.log("I don't understand what callback means");
    console.dir(callback);
    callback.call(this, dataTypeSingle)
  }
  let dataType3 = [
    {
      id:'0',
      text:'RRRRROOOOTTTT',
      state:{'opened':false},
      children:[{}]
    }
  ]

  $('#zipFileTree').jstree({
			"plugins" : [ "wholerow" ],
			'core' : {
				'data' : dataType2,
				'themes' : {
					'name' : 'default-dark'
				},
				'dblclick_toggle' : false,
        'check_callback' : true,
			},
			'types' : {
				"default" : {
				      "valid_children" : "all"
				 }
			}
  }).bind('select_node.jstree', function(evt, data){
    console.log("select_node.jstree Bind");
    console.log(evt)
    console.log(data)
  }).on('create_node.jstree',function(){ // jstree 에서 제공하는거 쓰면 이상함..흠..
    console.log("create");
  }).on('before_open.jstree',function(evt){
    console.log('open!!');
  }).on('select_node.jstree', function(evt){
  //  console.log('select_node.jstree on');
  //  console.log(evt);
  }).on('dblclick',function(evt){
    let node = $('#zipFileTree').jstree(true).get_selected(true);
    if(node[0].children.length==0) {
      $('#zipFileTree').jstree(true).create_node(node[0].id, {text: 'new', children:false}, console.dir('createNode!!') );
    }
    console.dir(node);
  }).on('load_node.jstree',function(node, status){
    console.dir(node);
    console.dir(status);
  })
})

this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
//console.log(retrieveX());
// 9 반환 - 함수가 전역 스코프에서 호출됐음

// module과 바인딩된 'this'가 있는 새로운 함수 생성
// 신입 프로그래머는 전역 변수 x와
// module의 속성 x를 혼동할 수 있음
var boundGetX = retrieveX.bind(module);
//console.log(boundGetX());
