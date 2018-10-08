// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- CHEMIN VICTOIRE -------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
	// Graph : Sommet = situation plateau ; Arete = action (changement couleur)
	// graph = tableau : [plateauCourant, lastAction]
	// Calcul meilleur chemin : tableau de graphs, prendre le graph/tableau le moins grand : taille tab = nb coups pour win
function actPossibleToWin (plat, pal) {
	this.plateau = plat;
	this.palette = pal;
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET PALETTE ---------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

function Palette (niveau, plat) {
	
	this.actMax = 10; 							// Nombre d'actions max avant de perdre
	this.tabCouleurs = new Array (0,1,2,3,4);	// Tableau de couleurs presentes sur le plateau
	this.plateau = plat;						// Plateau sur lequel on va appliquer les changement de couleur

	// Renvoie une couleur prise aleatoirement dans le tableau
	// couleur : couleur des cases du joueur 
	// bonus : % bonus d'avoir la meme couleur
	this.randomColor = function (couleur, bonus) {
		if (couleur!=null && bonus!=null) {
			// Math.random() : entre 0 et 1
		}
		// Sinon, donne une couleur aleatoire
		else {
			return this.tabCouleurs[getRandomInt(this.tabCouleurs.length)];
		}
	}

	// Quand clic sur couleur, test si c'est la meme couleur que le joueur
	// Sinon, appelle plateau.changeColor() et incremente le compteur d'actions
	this.pickColor = function (couleur) {
		// Si joueur change de couleur
		if (this.tabCases[0][0].color != couleur) {
			this.actMax -= 1;
			this.plateau.changeColor(couleur);
		}
	}

}

// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET PLATEAU ---------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

// Le plateau contient les 12x12 cases de couleur.
// Il cree les cases et les met dans tabCases

function Plateau (palette, size) {
	
	this.tabCases = new Array ();		// Case[][] tabCases : ableau contenant les cases colorees
	this.tabCheminWin = new Array ();	// [plateau][actionPrecedente] : [max][max]=situation win
	this.palette = palette;				// Palette de couleurs presentes sur le plateau
	this.taille = size;					// Taille d'un cote du plateau

	// VOID : Cree le plateau : matrices de cases de couleur aleatoires
	this.setUp = function () {
		var tabY = new Array ();						// Cree tableau des Y
		for (var y=0 ; y<this.taille ; y++) { 			// Boucle les cases a creer en Y
			tabY[y] = new Array ();					// Cree tableau des X
			for (var x=0 ; x<this.taille ; x++) {		// Boucle les cases a creer en X
				var control = false;
				if (y==0 && x==0) control = true;	// Si case en haut a droite -> controlee par user
				var case1 = new Case (palette.randomColor(), control, x, y);
				tabY[y].push(case1);
				//console.log(tabY[y][x]);
			}
		}
		this.tabCases = tabY;
	}

	// Change la couleur des cases controllees par le joueur
	// Prend le controle des cases adjacente de celles controllees si elles sont de meme couleur
	this.changeColor = function (couleur) {
		for (var y=0 ; y<this.tabCases.length ; y++) { 			// Boucle les cases en Y
			for (var x=0 ; x<this.tabCases[y].length ; x++) {	// Boucle les cases en X
				if (this.tabCases[y][x].control) {				// Si la case courante est controlee par joueur
					this.tabCases[y][x].color = couleur;		// Change sa couleur
					if (y-1>0 && this.tabCases[y-1][x].color == couleur) {this.tabCases[y-1][x].control = true;}
					if (y+1<this.taille && this.tabCases[y+1][x].color == couleur) {this.tabCases[y+1][x].control = true;}
					if (x-1>0 && this.tabCases[y][x-1].color == couleur) {this.tabCases[y][x-1].control = true;}
					if (x+1<this.taille && this.tabCases[y][x+1].color == couleur) {this.tabCases[y][x+1].control = true;}
				}
			}
		}
		console.log(this.toString());
		console.log(this.isWin());
	}

	// Return : true si victoire, false sinon
	this.isWin = function () {
		// Passe a false a la premiere cases rencontree non controllee par le joueur
		var win = true;		
		for (var y=0 ; y<this.tabCases.length ; y++) { 			// Boucle les cases a creer en Y
			for (var x=0 ; x<this.tabCases[y].length ; x++) {		// Boucle les cases a creer en X
				if (!this.tabCases[y][x].control) win = false;
			}
		}
		return win;
	}

	// Graph : Sommet = situation plateau ; Arete = action (changement couleur)
	// graph = tableau : [plateauCourant, lastAction]
	// Calcul meilleur chemin : tableau de graphs, prendre le graph/tableau le moins grand : taille tab = nb coups pour win
	this.getVictoire = function () {


	}



	// Renvoie un plateau copie du plateau courant
	this.clone = function () {
		var c = new Plateau (this.palette, this.taille);
		c.setUp();
		for (var y=0 ; y<this.tabCases.length ; y++) { 			// Boucle les cases en Y
			for (var x=0 ; x<this.tabCases[y].length ; x++) {		// Boucle les cases en X
				c.tabCases[y][x] = this.tabCases[y][x].clone();
			}
		}
		return c;
	}

	// Renvoie une string presentant les attributs du plateau
	this.toString = function () {
		var text = "\n";
		for (var y=0 ; y<this.taille ; y++) { 			// Boucle les cases en Y
			text += "[ ";
			for (var x=0 ; x<this.taille ; x++) {		// Boucle les cases en X
				text += this.tabCases[y][x].color;
				if (x<this.taille-1) text += " | ";
			}
			text += " ]\n";
		}
		return text;
	}

}


// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET CASE ------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

function Case (couleur,controlee,posX,posY) {

	this.color = couleur;					// Couleur de la case
	this.control = controlee;				// True si controlee par joueur, false sinon
	this.tabPos = new Array (posY, posX);	// Position y et x de la case dans le plateau

	// VOID : Modifie la couleur de la case
	this.setColor = function (color) {
		this.color = color;

	}

	// Renvoie une copie de la case courante
	this.clone = function () {
		return new Case(this.color, this.control, this.tabPos[1], this.tabPos[0]);
	}
	
	// Renvoie une string presentant les attributs de la case
	this.toString = function () {
		console.log("Case ["+this.tabPos[0]+","+this.tabPos[1]+"] : Couleur="+this.color+"; Contrôlée="+this.control);
	}
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- MAIN ------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

/* POUR CALCULER CHEMIN VICTOIRE : MODELISER EN GRAPH PUIS UTILISER DIJKSTRA */

// Utilisee pour generer une couleur aleatoire
function getRandomInt(max) {return Math.floor(Math.random() * Math.floor(max));}

// ------------------------- Creation objets / variables
var jouer = true; 				// false si le joueur veut arreter de jouer
var gagner = false;				// true si le joueur controle toutes les cases du plateau
var palette = new Palette (1);
var plateau = new Plateau (palette, 5);
plateau.setUp(5);


// ------------------------- Partie en cours

/*
while (jouer) {
	while (gagner == false) {

	}
}
*/


console.log(plateau.toString());
console.log("\nClone :\n"+plateau.clone().toString());
//console.log(plateau.isWin());
