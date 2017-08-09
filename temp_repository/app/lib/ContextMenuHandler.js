import {contextMenuView} from 'view/ContextMenuView.js'

let ContextMenuAction = {
	showMainContextView : function(evt) {
		evt.preventDefault();
	
		console.dir(contextMenuView);
		
		const x = evt.clientX - $(this).position().left
		const y = evt.clientY - $(this).position().top

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
