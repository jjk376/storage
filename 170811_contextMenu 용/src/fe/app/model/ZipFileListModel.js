import EventEmitter from 'events';
import { zipFileDownload } from 'lib/zipFileAction'

class ZipFileModel {
	constructor(json){
		this.zipfileName = json.zipfileName;
		this.zipfileType = json.zipfileName.slice(json.zipfileName.lastIndexOf(".") + 1).toLowerCase();
		this.zipfileId = json.zipfileId;
		this.zipfileSize = json.zipfileSize;
		this.hasDirectory = json.hasDirectory;
		this.zipfileParentId = json.zipfileParentId;
		this.isDirectory = json.isDirectory
		if(json.isDirectory) {
			this.zipfileType = "dir";
			this.zipfileSize = "";
		}
	}
}

class ZipFileListModel extends EventEmitter {
	constructor(rootModelId){
		super();
		this._zipFileList = [];
		this._apiZipFileDownload = zipFileDownload(rootModelId)
	}
	
	setModel(jsonArray){
	//	console.dir(jsonArray)
		this._zipFileList = [];
		jsonArray.forEach(this._pushZipFile, this)
	//	console.dir(this._zipFileList)
		this.emit("ModelSettingDone", this._zipFileList);
	}
	
	_pushZipFile(json){
		this._zipFileList.push(new ZipFileModel(json))
	}
	
	getZipFileModel(domId){
		return this._zipFileList[domId];
	}

}

export default ZipFileListModel;
