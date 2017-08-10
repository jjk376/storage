const APIURL =  "http://localhost:8080/api/files/";

export function zipFileLoad(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = new Promise(function(resolve, reject) {
		$.ajax({ url : apiURL, type : "POST", dataType: "json"})
			.done(function(response){
				resolve(response.items)
			})
			.fail(function(response){
				reject(response)
			})
	})
	return call;
}

export function zipFileList(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call =  new Promise(function(resolve, reject) {
		$.ajax({ url : apiURL, data : {'zipfileParentId' : parentId}, type : "GET", dataType: "json"})
			.done(function(response){
				resolve(response.items)
			})
			.fail(function(response){
				reject(response)
			})
	})
	return call;
}

export function zipFileRenew(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = new Promise(function(resolve, reject) {
		$.ajax({ url : apiURL, dataType: "json", type : "PATCH" })
			.done(function(response){
				resolve(response)
			})
			.fail(function(response){
				reject(response)
			})
	})
	return call;
}

export function zipFileDownload(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = new Promise(function(resolve, reject) {
		$.ajax({ url : apiURL, data : {"zipfileId" : zipFileId}, type : "GET", dataType: "json"})
		.done(function(response){
				resolve(response)
			})
			.fail(function(response){
				reject(response)
			})
	})
	return call;
}

export function zipFileExpire(fileId){
	let apiURL = APIURL + fileId + "/zipfiles";
	let call = new Promise(function(resolve, reject) {
		$.ajax({ url : apiURL, dataType: "json", type : "DELETE"})
			.done(function(response){
				resolve(response)
			})
			.fail(function(response){
				reject(response)
			})
	})
	return call;
}
/**
 * example 
	import {zipFileLoad} from "lib/ZipFileAction.js"
	
	const APILoad = zipFileLoad(11);
	APILoad().then(callbackFunction);
 
 */