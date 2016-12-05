var ListController = function(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // najachenia kursora myszy na element z kolorem (hover)
    this._view.listModified.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (listModified)
        _this.updateSelected(args.index);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia przycisku addButton
    this._view.addButtonClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (addButtonClicked)
        _this.addcolor(args.color);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // wciśnięcia klawisza enter na elemencie input
    this._view.inputEnterClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (inputEnterClicked)
        _this.addcolor(args.color);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia przycisku delButton
    this._view.delButtonClicked.attach(function() {

        // Wywołanie metody Kontrolera
        // na przechwycone zdarzenie (delButtonClicked)
        _this.delColor();
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia przycisku editButton
    this._view.editButtonClicked.attach(function() {

        // Wywołanie metody Kontrolera
        // na przechwycone zdarzenie (editButtonClicked)
        _this.editColor();
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // wciśnięcia klawisza enter na elemencie input
    this._view.inputEditEnterClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (inputEditEnterClicked)
        _this.addEditcolor(args.color);
    });
}

ListController.prototype = {
    addcolor: function(color) {

        if (color) {

            // Wywołanie metody Modelu addcolor i przekazanie jako argument
            // przechwyconej przez Widok wartości inputa
            this._model.addcolor(color);
        }
    },

    delColor: function() {
        var index;

        // Przypisanie do zmiennej aktywnego elementu z kolorem
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Wywołanie metody Modelu removeColorAt i przekazanie
            // jako argument indeks elementu
            this._model.removeColorAt(this._model.getSelectedIndex());
        }
    },

    editColor: function() {
        var index;

        // Przypisanie do zmiennej aktywnego elementu z kolorem
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Wywołanie metody Modelu editedColor i przekazanie
            // jako argument indeks elementu
            this._model.editedColor(this._model.getSelectedIndex());
        }
    },

    addEditcolor: function(color) {
        var index;

        // Przypisanie do zmiennej aktywnego elementu z kolorem
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            if (color) {

                // Wywołanie metody Modelu addEditcolor i przekazanie jako argument
                // przechwyconej przez Widok wartości inputa i indeks elementu
                this._model.addEditcolor(color, this._model.getSelectedIndex());
            }
        }
    },

    updateSelected: function(index) {

        // Wywołanie metody Modelu setSelectedIndex i przekazanie
        // jako argument indeks elementu z kolorem na jakim był hover
        this._model.setSelectedIndex(index);
    }
};