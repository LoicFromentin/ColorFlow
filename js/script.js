// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- CHEMIN VICTOIRE -------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
	// Graph : Sommet = situation plateau ; Arete = action (changement couleur)
	// graph = tableau : [plateauCourant, lastAction]
	// Calcul meilleur chemin : tableau de graphs, prendre le graph/tableau le moins grand : taille tab = nb coups pour win
function getCheminWin (plat, pal) {
	this.plateau = plat;		// Plateau de depart
	this.palette = pal;			// Palette de couleur
	var chemin = new Array ();	// Chemin le plus court pour gagner

	while (this.plateau.isWin() == false) {
		var cptColor = new Array ();	// 1 case represente une couleur, dans l'ordre des couleurs de la palette
		for (var i=0 ; i<this.palette.tabCouleurs.length ; i++) {
			cptColor.push(0);
		} // Ici, les compteurs de couleurs sont init a 0
		
		


		// Pour chaque case controlee (->A)
		for (var contr=0 ; contr<this.plateau.tabPosCasesControl.length ; contr++) {
			// Balaye les cases adjacentes de A (1 a 4) (->B)
			for (var i=0 ; i<this.getCasesAdj() ; i++) {
		// Incremente cmpt couleur avec les couleurs de ces cases adjacentes
		// Balaye les cases adjacentes de B (->C) :
			// Si C est de la meme couleur que B, incremente compteur et balaye aussi ses cases adj (meme traitement que B)
			}
		}

	}

	/*On balaye toutes les cases controlees
	On compte combien il y a d'occurrences de chaque couleur sur les cases adjacentes
	Change la couleur des cases controlees pour prendre le control du plus grand nombre de cases adjacentes
	---------
	Faire une methode qui appelle Plateau.getCasesAdjColor(case) de manière récursive, en ajoutant dans un tableau chaque return de la methode
		On regarde les cases adjacentes (soit A) : incremente compteur couleur
		On regarde les cases adjacentes des cases adjacentes (B adj à A) : 
			si une case B est de la meme couleur que A, regarde les cases adjacentes à B et incremente le compteur couleurs
	*/
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------- OBJET PALETTE ---------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------

function Palette (niveau,actMax) {
	
	this.cmptAct = 0; 							// Nombre d'actions du joueur					
	this.nbActMax = actMax;						// Nombre d'actions max avant de perdre
	this.tabCouleurs = new Array ();			// Tableau de couleurs presentes sur le plateau
	this.tabQteCouleurs = new Array ();			// Tableau de comptage du nombre d'occurrence d'une couleur
	this.plateau;								// Plateau sur lequel on va appliquer les changement de couleur

	// Cree le tableau de couleurs
	this.setUp = function (nb) {
		for (var i=0 ; i<nb ; i++) {
			this.tabCouleurs.push(i);
			this.tabQteCouleurs.push(0);
		}
	}

	// Renvoie une couleur prise aleatoirement dans le tableau
	// couleur : couleur des cases du joueur 
	// bonus : % bonus d'avoir la meme couleur
	this.randomColor = function (couleur, bonus) {
		if (couleur!=null && bonus!=null) {
			// Math.random() : entre 0 et 1
		}
		// Sinon, donne une couleur aleatoire
		else {
			var color = getRandomInt(this.tabCouleurs.length);
			this.tabQteCouleurs[color] +=1;	// Incremente le comptage d'occurrence de la couleur
			return this.tabCouleurs[color];
		}
	}

	// Quand clic sur couleur, test si c'est la meme couleur que le joueur
	// Sinon, appelle plateau.changeColor() et incremente le compteur d'actions
	this.pickColor = function (couleur) {
		// Si joueur change de couleur
		if (this.cmptAct<this.nbActMax && this.tabCases[0][0].color != couleur) {
			this.cmptAct += 1;
			this.plateau.changeColor(couleur);
		}
	}

	// Ajoute le plateau aux attributs
	this.setPlateau = function (plat) {
		this.plateau = plat;
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
	this.tabPosCasesControl = new Array ();// Contient les y et x des cases controlees

	// VOID : Cree le plateau : matrices de cases de couleur aleatoires
	this.setUp = function () {
		var tabY = new Array ();						// Cree tableau des Y
		for (var y=0 ; y<this.taille ; y++) { 			// Boucle les cases a creer en Y
			tabY[y] = new Array ();						// Cree tableau des X
			for (var x=0 ; x<this.taille ; x++) {		// Boucle les cases a creer en X
				var control = false;
				var color = palette.randomColor();
				if (y==0 && x==0) {
					control = true;						// Si case en haut a droite -> controlee par user
					color = 0;
					this.tabPosCasesControl.push(new Array (y,x));
				}
				var case1 = new Case (color, control, x, y);
				tabY[y].push(case1);
			}
		}
		this.tabCases = tabY;
	}

	// Change la couleur des cases controllees par le joueur
	// Prend le controle des cases adjacente de celles controllees si elles sont de meme couleur
	this.changeColor = function (couleur) {
		for (var y=0 ; y<this.taille ; y++) { 					// Boucle les cases en Y
			for (var x=0 ; x<this.taille ; x++) {				// Boucle les cases en X
				if (this.tabCases[y][x].control) {				// Si la case courante est controlee par joueur
					this.tabCases[y][x].setColor (couleur);		// Change sa couleur
					if (y-1>-1 && this.tabCases[y-1][x].color == couleur) {
						this.tabCases[y-1][x].control = true;
						this.tabPosCasesControl.push(this.tabCases[y-1][x].tabPos);
					}
					if (y+1<this.taille && this.tabCases[y+1][x].color == couleur) {
						this.tabCases[y+1][x].control = true;
						this.tabPosCasesControl.push(this.tabCases[y+1][x].tabPos);
					}
					if (x-1>-1 && this.tabCases[y][x-1].color == couleur) {
						this.tabCases[y][x-1].control = true;
						this.tabPosCasesControl.push(this.tabCases[y][x-1].tabPos);
					}
					if (x+1<this.taille && this.tabCases[y][x+1].color == couleur) {
						this.tabCases[y][x+1].control = true;
						this.tabPosCasesControl.push(this.tabCases[y][x+1].tabPos);
					}
				}
			}
		}
		console.log(this.toString());
		console.log("Gagné ? : "+this.isWin());
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

		// Appelle getCheminWin
	}

	// Renvoie les cases adjacentes, peu importe la couleur
	this.getCasesAdj = function (c) {
		var y = c.tabPos[0];
		var x = c.tabPos[1];
		var tab = new Array ();	// Contient les cases adjacentes de c
		if (y-1>=0) {tab.push(this.tabCases[y-1][x]);}
		if (y+1<this.taille) {tab.push(this.tabCases[y+1][x]);}
		if (x-1>=0) {tab.push(this.tabCases[y][x-1]);}
		if (x+1<this.taille) {tab.push(this.tabCases[y][x+1]);}
		return tab;
	}

	// Renvoie les cases adjacentes qui sont de la meme couleur
	this.getCasesAdjColor = function (c) {
		var tab = new Array ();	// Contient les cases de meme couleur que c
		if (y-1>-1 && this.tabCases[y-1][x].color == couleur) {tab.push(this.tabCases[y-1][x]);}
		if (y+1<this.taille && this.tabCases[y+1][x].color == couleur) {tab.push(this.tabCases[y+1][x]);}
		if (x-1>-1 && this.tabCases[y][x-1].color == couleur) {tab.push(this.tabCases[y][x-1]);}
		if (x+1<this.taille && this.tabCases[y][x+1].color == couleur) {tab.push(this.tabCases[y][x+1]);}
		return tab;
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
var palette = new Palette (1,20);
palette.setUp(3);
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

//console.log("\nClone :\n"+plateau.clone().toString());
//console.log(plateau.isWin());
