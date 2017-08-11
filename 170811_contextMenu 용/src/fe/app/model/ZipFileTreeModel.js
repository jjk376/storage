// 패치를 만들어서 파라미터 a를 넣어서 a 하위에 있는 것들을 요청하는 api 
//	fetchChildren (fileId) {
//		$.ajax()
//		.done()//addmodel 실행
//	}
import EventEmitter from 'events';
import {zipFileList} from 'lib/zipFileAction'

class ZipFileModel {
	constructor(json){
		this.id = json.zipfileId;
		this.text = json.zipfileName;
		this.children = json.hasDirectory;
		this.parent = json.zipfileParentId; // 경로 찾기용. 추후에 뺄 수도 있다.
	}	
//	setChildren(children){
//		if(this.children){
//			this.children = new Map();
//			children.forEach(this._setChild, this)
//		} else {
//			console.log("ZipFileTree NODE #" + this.id + " : Can't have any Children")
//		}
//	}
//	_setChild(child){
//		this.children.set(child);
//	} 
}

class ZipFileTreeModel extends EventEmitter { 
	constructor(rootModel){
		super();
		this._zipFileTree = new Map();
		this._setRootModel(rootModel)
	}
	_setRootModel(rootModel){
		this._zipFileTree.set(0, {id: 0, text: rootModel.fileName, children: true , parent: '#' ,state: { opened : true }})
	}
	
	getPath(zipFileId){
		const pathArray = [];
		let parentId = zipFileId;
		while( parentId != '#') {
			parentId = this._zipFileTree.get(parentId).parent;
			pathArray.push(parentId);
		}
		return pathArray;
	}
	
	initModel(jsonArray, obj, callback) { 
		const dirArray = jsonArray.filter(this._getDirType);
		
		dirArray.forEach(this._setDirModel, this)
		console.dir(this._zipFileTree);
		if(dirArray.length != 0) {
			this._zipFileTree.get(0).children = false;
		}
		callback.call(obj, Array.from(this._zipFileTree.values()))
	}
	
	_getDirType(json){
		return json.isDirectory
	}
	
	_setDirModel(json){
		this._zipFileTree.set(json.zipfileId, new ZipFileModel(json));
	}
	
	_setPortion(json){
		this.push( new ZipFileModel(json) )
	}
	
	addModel(jsonArray, obj, callback) {
		const dirArray = jsonArray.filter(this._getDirType);
		let dir = [];
		dirArray.forEach(this._setDirModel, this)
		dirArray.forEach(this._setPortion, dir);
		callback.call(obj, dir)
	}
	
	fetchModel(jsonArray) {
		console.log('zipListModel에서 ListAPI가 이미 호출 되어, 필요한 데이터를 가져올때 불리는 함수')
	}
	


}
export default ZipFileTreeModel;
