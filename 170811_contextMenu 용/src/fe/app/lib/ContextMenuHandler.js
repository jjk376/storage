const contextMenuView = $('<div id="contextMenu"></div>');
const downloadMenu = $('<div class="menu"></div>').text('다운로드');
const deleteMenu = $('<div class="menu"></div>').text('삭제');
contextMenuView.append(downloadMenu).append(deleteMenu);


let ContextMenuAction = {
	showMainContextView : function(evt) {
		evt.preventDefault();
	
		console.dir(contextMenuView);
		
		const x = evt.pageX - $(this).position().left
		const y = evt.pageY- $(this).position().top

		contextMenuView.css('display','block')
		contextMenuView.css('top', y)
		contextMenuView.css('left', x)
		
		contextMenuView.on("click",".menu", function(evt){
			evt.stopPropagation();
			console.log("Do something in here");
		})
		
		$(this).append(contextMenuView)
		
	},
	hideMainContextView : function(evt) {
		contextMenuView.remove();
	}
}
export default ContextMenuAction
