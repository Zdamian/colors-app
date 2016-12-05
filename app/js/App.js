$(function() {
    var model = new ListModel([{
            color: '444'
        }, {
            color: '000'
        }]),
        view = new ListView(model, {
            'list': $('.app-colors'),
            'addButton': $('.app-button'),
            'input': $('.app-input')
        }, {
            'listColor': '.app-box',
            'deleteButton': '.app-del',
            'editButton': '.app-edit',
            'editInput': '.app-edit-input'
        }),
        controller = new ListController(model, view);

    view.render();
});
