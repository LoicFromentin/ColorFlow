// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET PLATEAU ---------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

// Le plateau contient les 12x12 cases de couleur.
// Il permet de 

function Plateau (palette, taille) {
	
	// Case[][] tabCases : ableau contenant les cases colorees
	var tabCases;
	var palette = palette;

	this.setUp = function () {
		var tab = new Array ();				// Cree tableau des Y
		for (var y=0 ; y<taille ; y++) { 		// Boucle les cases a creer en Y
			tab[y] = new Array ();			// Cree tableau des X
			for (var x=0 ; x<taille ; x++) {	// Boucle les cases a creer en X
				//tab[y] = 
			}
		}
	}

}


// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET CASE ------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

function Case (color,controlee,posX,posY) {

	var color = color;
	var control = controlee;
	var tabPos = {posX, posY};

	this.setColor = function (color) {
		this.color = color;
	}
}