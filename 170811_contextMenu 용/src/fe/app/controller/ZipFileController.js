import ZipFileListModel from "model/ZipFileListModel.js"
import ZipFileTreeModel from "model/ZipFileTreeModel.js"
import ZipFileListView from "view/ZipFileListView.js"
import ZipFileTreeView from "view/ZipFileTreeView.js"
import {zipFileList, zipFileLoad, zipFileExpire} from 'lib/zipFileAction'

class ZipFileController {
	constructor(fileModel){
		
		this._fileId = fileModel.fileId;
		
		this._zipFileListView = new ZipFileListView("#zipFileList"); 
		this._zipFileTreeView = new ZipFileTreeView("#zipFileTree"); 	

		this._zipFileTreeModel = new ZipFileTreeModel(fileModel);
		this._zipFileListModel = new ZipFileListModel(fileModel.fileId);
		
		this.$criticalErrorModal = $("#ErrorModal");
		this.$zipFileModal = $("#zipFileModal");
		
		this._bindModelEvents()
		this._bindListViewEvents();
		this._bindTreeViewEvents();
		this._bindClickFinishEvent();
		
		this._startView(fileModel);

		
		this._zipFileTreeView.start();
//		this._bindErrorModalEvents(); // 이부분 좀 더 고민 해주세요.
		
	}
	
	_bindModelEvents(){ 
		this._zipFileListModel.on("ModelSettingDone", this._zipFileListView.rendering.bind(this._zipFileListView))
	}
	
	_bindListViewEvents(){ 
		const self = this;
		let dom = this._zipFileListView.getDom();
		const APIList = zipFileList(this._fileId);
		
		dom.on("click", ".zipfile", function(evt){
			const zipFile = self._zipFileListModel.getZipFileModel(this.dataset.id);
			if( zipFile.isDirectory ) {
				APIList(zipFile.zipfileId).done(function(res){
					let response = res.items
					self._zipFileListModel.setModel(response);
				})
			} else {
				console.log("Not a directory type");
			}
		});
	}
	
	_bindTreeViewEvents(){ 
		let self = this;
		
		const APIList = zipFileList(this._fileId);
		const APILoad = zipFileLoad(this._fileId);
		
		this._zipFileTreeView
			.once("APILoadNeed",function(obj, callback){
				APILoad().done(function(res){
					let response = res.items
					self._zipFileTreeModel.initModel(response, obj, callback)
					self._zipFileListModel.setModel(response);
				})
			})
			.on("APIListNeed:Tree", function(obj, callback){
				let parentId = obj.id
				APIList(parentId).done(function(res){
						let response = res.items
						self._zipFileTreeModel.addModel(response, obj, callback)
					})
			})
			.on("APIListNeed:Dir", function(parentId) {
				APIList(parentId).done(function(res){
					let response = res.items
					self._zipFileListModel.setModel(response);
				})
			})
	}
	
	_startView(root){
		$("#ZipViewerBackground").css("display","block");
	}
	
	_bindClickFinishEvent() {
		let self = this;
		$("#zipFileClose").on("click", this._finish.bind(this))
	}
	
	_bindErrorModalEvents(){
		this.$criticalErrorModal.on('hidden.bs.modal', this._finish.bind(this));
	}
	
	_finish(){
		
		$("#ZipViewerBackground").css("display","none");
		$("#zipFileClose").off("click") 
		
		const zipFileExpire = zipFileExpire(this.fileId);
		
		this._zipFileTreeView.destroy();
		this._zipFileListView.destroy();
		
		this._zipFileListView = null;
		this._zipFileTreeView = null;

		this._zipFileTreeModel = null;
		this._zipFileListModel = null;

		this.$zipFileModal = null;
		this.$criticalErrorModal = null;
		
		zipFileExpire();
		
		console.log("zipFileController Finished");
	}
}
export default ZipFileController;
