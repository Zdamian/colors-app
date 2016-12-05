var ListView = function(model, elements, selectors) {
    this._model = model;
    this._elements = elements;
    this._selectors = selectors;

    // Event powiadamiający kontroler, gdy kursor
    // znalazł się na elemencie z kolorem (hover)
    this.listModified = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element addButton
    this.addButtonClicked = new Event(this);

    // Event powiadamiający kontroler,
    // gdy został wciśnięty klawisz enter na elemencie input
    this.inputEnterClicked = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element delButton
    this.delButtonClicked = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element editButtonClicked
    this.editButtonClicked = new Event(this);

    var _this = this;

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal dodany nowy color i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.colorAdded.attach(function() {

        // Odświeżenie widoku
        _this.render();
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal usunięty kolor i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.colorRemoved.attach(function(sender, args) {

        // Odświeżenie widoku
        _this.removedColor(args.index);
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal edytowany kolor i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.editColor.attach(function(sender, args) {

        // Odświeżenie widoku
        _this.editColor(args.index);
    });

    // Przechwycenie zdarzenia najchenia kursora na element z kolorem (hover)
    this._elements.list.on('mouseover', this._selectors.listColor, function() {
        var _self = this;

        // Widok powiadamia (notify) kontroler,
        // że kursor zanalazł się na elemencie z kolorem i w powiadomieniu wysyła
        // indeks tego elementu
        _this.listModified.notify({
            index: $(_self).prevAll().length
        });
    });

    // Przechwycenie zdarzenia kliknięcie na element addButton
    this._elements.addButton.on('click', function() {

        // Widok powiadamia (notify) kontroler,
        // że addButton został kliknięty i w powiadomieniu wysyła
        // wartość input
        _this.addButtonClicked.notify({
            color: _this._elements.input.val().trim()
        });
    });

    // Przechwycenie zdarzenia wciśnięcia klawisza enter na elemncie input
    this._elements.input.on('keyup', function(e) {
        if (e.keyCode === 13) {

            // Widok powiadamia (notify) kontroler,
            // że klawisz enter zastał wciśnięty i w powiadomieniu wysyła
            // wartość elementu input
            _this.inputEnterClicked.notify({
                color: _this._elements.input.val().trim()
            });
        }
    });

    // Przechwycenie zdarzenia kliknięcie na element delButton
    this._elements.list.on('click', this._selectors.deleteButton, function() {

        // Widok powiadamia (notify) kontroler, 
        // ze delButton został klinknięty
        _this.delButtonClicked.notify();
    });

    // Przechwycenie zdarzenia kliknięcie na element editButton
    this._elements.list.on('click', this._selectors.editButton, function() {

        // Widok powiadamia (notify) kontroler, 
        // ze editButton został klinknięty
        _this.editButtonClicked.notify();
    });

};

ListView.prototype = {
    render: function() {
        var list, colors, key;

        list = this._elements.list;
        list.html('')

        colors = this._model.getcolors();
        for (key in colors) {

            var $box = $('<div class="col-md-1 well app-box box-color"></div>');
            var $boxRow = $('<div class="row text-center"></div>');
            var $boxDel = $('<div class="col-md-12"></div>');
            var $boxColorName = $('<span class="col-md-12 app-edit color-name" data-toggle="tooltip" data-placement="top" title="Edit">#' + colors[key].color + '</span>');
            var $del = $('<span class="app-del glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Delete"></span>');

            $box.css('background-color', '#' + colors[key].color + '');

            $box.append($boxRow);
            $boxRow.append($boxDel);
            $boxRow.append($boxColorName);
            $boxDel.append($del);
            list.append($box);

            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            });

        }

        this._model.setSelectedIndex(-1);

        this._elements.input.val('').focus();
    },

    removedColor: function(index) {

        list = this._elements.list;

        var itemDel = list.find(this._selectors.listColor + ':eq(' + index + ')');

        itemDel.addClass('removing');


        setTimeout(function() {
            itemDel.remove();
        }, 300);
    },

    editColor: function(index) {

        list = this._elements.list;

        var $editInput = $('<input type="text"class="app-edit-input" placeholder="" autofocus/>');
        var $itemEdit = list.find(this._selectors.editButton + ':eq(' + index + ')');
        var itemEditText = $itemEdit.text();

        $editInput.val(itemEditText).focus();
        $itemEdit.replaceWith($editInput);
    },
};