$(document).ready(function() {


	let dataToBeInserted = [
		{
		//	id : '1',
			text : 'Root',
			state : {
				opened : false
			},
			children : true // 이게 true 면 open_node가 실행 되지 않고 load node가 실행된다. 
		},{
		//	id : '2',
			text : 'Root',
			state : {
				opened : false
			},
			children : true // 이게 true 면 open_node가 실행 되지 않고 load node가 실행된다. 
		},{
		//	id : '3',
			text : 'Root',
			state : {
				opened : false
			},
			children : true // 이게 true 면 open_node가 실행 되지 않고 load node가 실행된다. 
		}
	]

	let dataType2 = function(obj, callback) {
		console.log('the node being loaded and a callback function to call with the children for that node once you are ready.')
		callback.call(obj, dataToBeInserted)
		// 이 함수 실행을 할때 model을 받아온 다음에 호출 해야 함.
		
	}
	let dataType3 = [
		{
			id : '0',
			text : 'RRRRROOOOTTTT',
			state : {
				opened : false
			},
			children : [ {} ]
		}
	]

	var childNode = {
			text : 'new',
			state : {
				opened : false
			},
			children : true
		}
	var selectedNode = 0;

	
	
	
	let zipFileList = function(fileId) {
	    return new Promise(function(resolve, reject) {
	    	$.ajax({ url : "http://localhost:8080/api/files/"+fileId+"/zipfiles", dataType: "json", type : "GET"})
	    		.done(function(response){
	    			resolve(response)
	    		})
	    })
	}
	
//	let zipFileList = function(fileId) {
//		let res;
//	    return (function(resolve, reject) {
//	    	$.ajax({ url : "http://localhost:8080/api/files/"+fileId+"/zipfiles", dataType: "json", type : "GET"})
//	    		.done(function(response){
//	    			res = response;
//	    	})
//	    	return res
//	    })
//	}

	
	let setModel = function(jsonArray){
		let model = [];
		jsonArray.forEach(function(json){
			if(json.isDirectory)
				model.push({id:json.zipfileId, text:json.zipfileName, children: json.hasDirectory, parent: json.parent})
		})
		return model
	}

	$('#zipFileTree').jstree({
		"plugins" : [ "wholerow" ],
		'core' : {
			'data' : function(obj, callback){
				const objId = obj.id;

				console.log('the node being loaded and a callback function to call with the children for that node once you are ready.')
				zipFileList(11)
				.then(function(result){
					let model = setModel(result.items);
					console.log(model);
					callback.call(obj,model);
				})
			//	event.trigger('event', obj, callback);
			},
			'themes' : {
				'name' : 'proton'
			},
			'check_callback' : true,
		},
		'types' : {
			"default" : {
				"valid_children" : "all"
			}
		}
	}).on('select_node.jstree', function(evt, data) { 
		console.log("select_node.jstree");
//		console.log(evt)
		console.log(data)
		selectedNode = data.node.id;
//		console.log(selectedNode)
	}).on('create_node.jstree', function() { // jstree 에서 제공하는거 쓰면 이상함..흠..
		console.log("create_node.jstree");
	}).on('before_open.jstree', function(evt) {
		console.log('before_open.jstree');
	}).on('dblclick', function(evt) { 
		let node = $('#zipFileTree').jstree(true).get_selected(true);
		if (node[0].children.length == 0) {
			$('#zipFileTree').jstree(true).create_node(node[0].id, {
				text : 'new',
				children : false,
				parent: node[0].id
			});
			$('#zipFileTree').jstree(true).open_node(node[0].id) // 강제로 열어
			
		}
		console.dir(node);
//		this.trigger('load_node.jstree')
	}).on('load_node.jstree', function(evt, data) { // ajax 요청을 여기서 보내야함. 근데 promise 어떻게 하지... 
		console.log('load_node.jstree');
	//	console.dir(evt);
		console.dir(data.node);
	}).on('loading.jstree', function(evt, node){
		console.log('loading.jstree'); // 언제 발생한다.
	}).on('loaded.jstree', function(evt, instance){
		console.log('loaded.jstree');
		console.log(instance)
	}).on('init.jstree', function(evt, node){
		console.log('init.jstree');
	}).on('open_node.jstree', function(evt, node){
		console.log('open_node.jstree');
	})
	
	$('#zipFileTree').jstree(true).load_node()
	
})

this.x = 9;
var module = {
	x : 81,
	getX : function() {
		return this.x;
	}
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

/*
 * 콜로저 : 함수를 값으로 다룰 수 있다는 사실과 함수 스택의 특성을 결합하면 흥미로운 문제를 제기할 수 있다.
 * 
 * 지역 변수를 생성한 함수의 호출이 끝나 더는 스택에 남아 있지 않으면 그런 지역 변수는 어떻게 될까?
 */
function createFunction(){
	var local = 100;
	return function(num){return local+num}
}
/**
 * createFunctino이 호출되면 지역변수를 생성한 후 이 지역 변수를 반환하는 함수를 반환한다.
 * 이런 상황을 처리하는 방법에 관한 문제를 상향펀아그 문제라고 하며, 이전의 여러 프로그래밍 언어에서는 이렇게 하지 못하게했다.
 * 자바스크립트는 지역 변수에 접근할 수 만 있다면 지역변수를 보존하려 한다.
 *  createFunction()(2)를 수행하면, 102가 나온다.
 */
console.dir(createFunction()(4))

/**
 * 이런 특징을 닫힘이라고 하며, 일부 지역 변수에 닫혀 있는 함수를 클로저라고 한다. 
 */

	function getModel(model){
		return new Promise(function(resolve, reject){
			resolve(model*4);
		})
	}
	getModel(1)
		.then(function(result){console.log(result)});




	