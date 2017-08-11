
export const contextMenuView = $('<div id="contextMenu"></div>');
const downloadMenu = $('<div class="menu"></div>').text('다운로드');
const deleteMenu = $('<div class="menu"></div>').text('삭제');
contextMenuView.append(downloadMenu).append(deleteMenu);

