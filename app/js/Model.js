var ListModel = function(colors) {
	this._colors = colors;
	this._selectedIndex = -1;

	// Zdarzenie (Event) emitowany do Widoku, że został dodany nowy kolor
	this.colorAdded = new Event(this);

	// Zdarzenie (Event) emitowany do Widoku, że został usunięty kolor
    this.colorRemoved = new Event(this);

	// Zdarzenie (Event) emitowany do Widoku, że został edytowany kolor
    this.editColor = new Event(this);
}

ListModel.prototype = {
	getcolors: function() {

		// Zwraca tablicę kolorów
		return [].concat(this._colors);
	},

	addcolor: function(color) {

		var colorUpCase = color.toUpperCase();
		// Dostawienie nowego koloru do tablicy colors
		this._colors.push({
			color: colorUpCase
		});

		// Wysłanie powiadomienia do Widoku, że został dodany nowy kolor
		this.colorAdded.notify({
			color: color // Opcjonalne
		});
	},

    removeColorAt: function(index) {
        var color;

        // Usunięcie wybranego elementu z tablicy colors
        color = this._colors[index];
        this._colors.splice(index, 1);

        // Wysłanie indeksu elementu listy do Widoku
        this.colorRemoved.notify({
            index: index
        });

        // Zerowanie ektywnego indeksu listy
        this.setSelectedIndex(-1);
    },

    editedColor: function(index) {
        var color;

        color = this._colors[index];

        // Wysłanie indeksu elementu listy do Widoku
        this.editColor.notify({
            index: index
        });

        // Zerowanie ektywnego indeksu listy
        this.setSelectedIndex(-1);
    },

	getSelectedIndex: function() {

		// Zwrócenie aktywnego indkesu elementu z kolorem
		return this._selectedIndex;
	},

	setSelectedIndex: function(index) {

		// Ustawienie aktywnego indeksu elementu z kolorem
		this._selectedIndex = index;
	}
}