var mouseX,
	mouseY,
	m;

var exit = new Image();
exit.src = "exit.png";

	/*Tworzenie menu*/

function menu(name) {
	this.name = name;
	this.options = new Array();
	m = this;
	if (this.name == "Ratusz") {
		this.addOption("", "upgradeSaw", 50, 20, 70, 500, "red", "blue", "blue");
		this.addOption("", "upgradeBrick", 50, 140, 70, 500, "red", "blue", "blue");
		this.addOption("", "upgradeIron", 50, 250, 70, 500, "red", "blue", "blue");
		this.addOption("", "upgradeWall", 50, 350, 70, 500, "red", "blue", "blue");
		this.addOption("Wybuduj pałac (15000 D, 15000 G, 15000 Z)", "wingame", 50, 475, 70, 500, "red", "blue", "blue");
		this.options[4].color = "white";
	}
	if (this.name == "Koszary") {
		var kosztk = "(" + konnica.drewno + " Drewna," + konnica.glina + " Gliny," + konnica.zelazo + " Zelaza)";
		var kosztl = "(" + lucznik.drewno + " Drewna," + lucznik.glina + " Gliny," + lucznik.zelazo + " Zelaza)";
		var kosztp = "(" + pikinier.drewno + " Drewna," + pikinier.glina + " Gliny," + pikinier.zelazo + " Zelaza)";
		this.addOption("Zrekrutuj pikiniera " + kosztp, "recruitP", 50, 20, 150, 500, "red", "blue", "blue");
		this.addOption("Zrekrutuj łucznika " + kosztl, "recruitL", 50, 220, 150, 500, "red", "blue", "blue");
		this.addOption("Zrekrutuj konnice " + kosztk, "recruitK", 50, 420, 150, 500, "red", "blue", "blue");
	}
}

	/*Aktualizowanie menu*/

menu.prototype.update = function () {
	if (this.name == "Ratusz") {
		var kosztt = " (" + t.drewno + " Drewna," + t.glina + " Gliny," + t.zelazo + " Zelaza)";
		var kosztc = " (" + c.drewno + " Drewna," + c.glina + " Gliny," + c.zelazo + " Zelaza)";
		var koszth = " (" + h.drewno + " Drewna," + h.glina + " Gliny," + h.zelazo + " Zelaza)";
		var kosztm = " (" + mur.drewno + " Drewna," + mur.glina + " Gliny," + mur.zelazo + " Zelaza)";
		this.options[0].text = "Ulepsz tartak - " + t.level + kosztt;
		this.options[1].text = "Ulepsz cegielnie - " + c.level + kosztc;
		this.options[2].text = "Ulepsz hute - " + h.level + koszth;
		this.options[3].text = "Ulepsz mur - " + mur.level + kosztm;
	}
}
	/*Renderowanie*/

menu.prototype.render = function () {
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, cw, ch);
	ctx.drawImage(exit, cw - 64, 0, 64, 64)

}

	/*Funkcja dodawająca opcje*/

menu.prototype.addOption = function (text, funct, x, y, h, w, color, color2, color3) {
	new option(this, text, funct, x, y, h, w, color, color2, color3);
}

function option(m, text, funct, x, y, h, w, color, color2, color3) {
	this.text = text;
	this.funct = funct;
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.x_right = this.x + this.w;
	this.y_bottom = this.y + this.h;
	this.bh = 50,
	this.bw = 80,
	this.bx = this.x_right - 100,
	this.by = this.y + this.h / 2 - this.bh / 2;
	this.bx_right = this.bx + this.bw;
	this.by_down = this.by + this.bh;
	this.color = color;
	this.color2 = color2;
	this.color3 = color3;
	this.hovered = false;
	this.clicked = false;
	m.options.push(this);

}

	/*Renderowanie wszystkich opcji*/

menu.prototype.renderOptions = function () {
	this.options.forEach(function (e) {
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.font = "15px Arial";
		ctx.strokeRect(e.x, e.y, e.w, e.h);
		ctx.fillStyle = "black";
		ctx.fillText(e.text, e.x + 25, e.y + e.h / 2 + 7);

		if (e.hovered == true) {
			ctx.fillStyle = e.color2;
		}
		if (e.clicked == true) {
			ctx.fillStyle = e.color3;
		}
		if (e.hovered == false && e.clicked == false) {

			if (e.funct == "upgradeSaw" && t.w_budowie == true) {

				ctx.fillStyle = "MediumSeaGreen";

			} else if (e.funct == "upgradeBrick" && c.w_budowie == true) {

				ctx.fillStyle = "MediumSeaGreen";

			} else if (e.funct == "upgradeIron" && h.w_budowie == true) {

				ctx.fillStyle = "MediumSeaGreen";

			} else if (e.funct == "upgradeWall" && mur.w_budowie == true) {

				ctx.fillStyle = "MediumSeaGreen";

			} else {
				ctx.fillStyle = e.color;
			}
		}
		ctx.fillRect(e.bx, e.by, e.bw, e.bh);
		ctx.fillStyle = "black";

		switch (e.funct) {
			case "upgradeSaw":
				if (t.w_budowie == true) {
					ctx.fillText("W budowie" + "           Dzień ukończenia rozbudowy: " + t.koniec_budowy, e.bx + 3, e.by + e.bh / 2 + 7);
				} else if (t.level == 0) {
					ctx.fillText("Wybuduj" + "           Czas rozbudowy: 1", e.bx + ctx.measureText("Wybuduj").width / 2 - 16, e.by + e.bh / 2 + 7);
				} else if (t.level == 10) {
					ctx.fillText("Maximum", e.bx + ctx.measureText("Maximum").width / 2 - 22, e.by + e.bh / 2 + 7);
				} else {
					ctx.fillText("Ulepsz" + "           Czas rozbudowy: " + t.czas_budowy, e.bx + ctx.measureText("Ulepsz").width / 2 - 6, e.by + e.bh / 2 + 7);
				}
				break;

			case "upgradeBrick":

				if (c.w_budowie == true) {
					ctx.fillText("W budowie" + "           Dzień ukończenia rozbudowy: " + c.koniec_budowy, e.bx + 3, e.by + e.bh / 2 + 7);
				} else if (c.level == 0) {
					ctx.fillText("Wybuduj" + "           Czas rozbudowy: 1", e.bx + ctx.measureText("Wybuduj").width / 2 - 16, e.by + e.bh / 2 + 7);
				} else if (c.level == 10) {
					ctx.fillText("Maximum", e.bx + ctx.measureText("Maximum").width / 2 - 22, e.by + e.bh / 2 + 7);
				} else {
					ctx.fillText("Ulepsz" + "           Czas rozbudowy: " + c.czas_budowy, e.bx + ctx.measureText("Ulepsz").width / 2 - 6, e.by + e.bh / 2 + 7);
				}
				break;

			case "upgradeIron":
				if (h.w_budowie == true) {
					ctx.fillText("W budowie" + "           Dzień ukończenia rozbudowy: " + h.koniec_budowy, e.bx + 3, e.by + e.bh / 2 + 7);
				} else if (h.level == 0) {
					ctx.fillText("Wybuduj" + "           Czas rozbudowy: 1", e.bx + ctx.measureText("Wybuduj").width / 2 - 16, e.by + e.bh / 2 + 7);
				} else if (h.level == 10) {
					ctx.fillText("Maximum", e.bx + ctx.measureText("Maximum").width / 2 - 22, e.by + e.bh / 2 + 7);
				} else {
					ctx.fillText("Ulepsz" + "           Czas rozbudowy: " + h.czas_budowy, e.bx + ctx.measureText("Ulepsz").width / 2 - 6, e.by + e.bh / 2 + 7);
				}
				break;

			case "upgradeWall":
				if (mur.w_budowie == true) {
					ctx.fillText("W budowie" + "           Dzień ukończenia rozbudowy: " + mur.koniec_budowy, e.bx + 3, e.by + e.bh / 2 + 7);
				} else if (mur.level == 0) {
					ctx.fillText("Wybuduj" + "           Czas rozbudowy: 1", e.bx + ctx.measureText("Wybuduj").width / 2 - 16, e.by + e.bh / 2 + 7);
				} else if (mur.level == 5) {
					ctx.fillText("Maximum", e.bx + ctx.measureText("Maximum").width / 2 - 22, e.by + e.bh / 2 + 7);
				} else {
					ctx.fillText("Ulepsz" + "           Czas rozbudowy: " + mur.czas_budowy, e.bx + ctx.measureText("Ulepsz").width / 2 - 6, e.by + e.bh / 2 + 7);
				}
				break;

			case "wingame":
				ctx.fillText("Wybuduj", e.bx + ctx.measureText("Wybuduj").width / 2 - 16, e.by + e.bh / 2 + 7);
				break;

			default:
				ctx.fillText("Rekrutuj", e.bx + ctx.measureText("Rekrutuj").width / 2 - 14, e.by + e.bh / 2 + 7);
				break;
		}
	})
}


		/*Zdarzenie przy nacisnieciu guzika w menu*/

window.addEventListener("click", function (e) {
	if (menuOpened == false) {
		mouseX = e.clientX - canvas.getBoundingClientRect().left;
		mouseY = e.clientY - canvas.getBoundingClientRect().top;

		if (!(in_city)) {
			for (d = 0; d < Menu.options.length; d++) {
				var button = Menu.options[d];
				if (mouseX >= button.bx && mouseX <= button.bx_right) {
					if (mouseY >= button.by && mouseY <= button.by_down) {
						up(button.funct);
						button.clicked = true;
						mouseX = null;
						mouseY = null;

					}


				}

			}
			setTimeout(function () {
				for (d = 0; d < Menu.options.length; d++) {
					Menu.options[d].clicked = false;
				}
			}, 50);
			if (mouseX >= cw - 64 && mouseX <= cw) {
				if (mouseY >= 0 && mouseY <= 64) {
					mouseY = "";
					mouseX = "";
					in_city = true;
					delete Menu;
					document.getElementById("current").style.height = "0";
					setTimeout(function () {
						document.getElementById("current").innerHTML = "";
					}, 50);
				}
			}
		}
	}
});









function up(str) {
	switch (str) {
		case "upgradeSaw":
			if (Player.drewno >= t.drewno && Player.glina >= t.glina && Player.zelazo >= t.zelazo) {
				if (t.level + 1 > 10 || t.w_budowie == true) {
					break;
				} else {

					Player.drewno -= t.drewno;
					Player.glina -= t.glina;
					Player.zelazo -= t.zelazo;
					t.w_budowie = true;
					t.koniec_budowy = t.aktualny_dzien + t.czas_budowy;

				}
			}
			break;
		case "upgradeBrick":
			if (Player.drewno >= c.drewno && Player.glina >= c.glina && Player.zelazo >= c.zelazo) {
				if (c.level + 1 > 10 || c.w_budowie == true) {
					break;
				} else {

					Player.drewno -= c.drewno;
					Player.glina -= c.glina;
					Player.zelazo -= c.zelazo;
					c.w_budowie = true;
					c.koniec_budowy = c.aktualny_dzien + c.czas_budowy;

				}
			}
			break;
		case "upgradeIron":
			if (Player.drewno >= h.drewno && Player.glina >= h.glina && Player.zelazo >= h.zelazo) {
				if (h.level + 1 > 10 || h.w_budowie == true) {
					break;
				} else {

					Player.drewno -= h.drewno;
					Player.glina -= h.glina;
					Player.zelazo -= h.zelazo;
					h.w_budowie = true;
					h.koniec_budowy = h.aktualny_dzien + h.czas_budowy;

				}
			}
			break;
		case "upgradeWall":
			if (Player.drewno >= mur.drewno && Player.glina >= mur.glina && Player.zelazo >= mur.zelazo) {
				if (mur.level + 1 > 5 || mur.w_budowie == true) {
					break;
				} else {

					Player.drewno -= mur.drewno;
					Player.glina -= mur.glina;
					Player.zelazo -= mur.zelazo;
					mur.w_budowie = true;
					mur.koniec_budowy = mur.aktualny_dzien + mur.czas_budowy;

				}
			}
			break;
		case "recruitP":
			if (Player.drewno >= pikinier.drewno && Player.glina >= pikinier.glina && Player.zelazo >= pikinier.zelazo) {
				Player.pikinierzy++;
				Player.drewno -= pikinier.drewno;
				Player.glina -= pikinier.glina;
				Player.zelazo -= pikinier.zelazo;
			}
			break;
		case "recruitL":
			if (Player.drewno >= lucznik.drewno && Player.glina >= lucznik.glina && Player.zelazo >= lucznik.zelazo) {
				Player.lucznicy++;
				Player.drewno -= lucznik.drewno;
				Player.glina -= lucznik.glina;
				Player.zelazo -= lucznik.zelazo;
			}
			break;
		case "recruitK":
			if (Player.drewno >= konnica.drewno && Player.glina >= konnica.glina && Player.zelazo >= konnica.zelazo) {
				Player.konnice++;
				Player.drewno -= konnica.drewno;
				Player.glina -= konnica.glina;
				Player.zelazo -= konnica.zelazo;
			}
			break;

		case "wingame":
			if (Player.drewno >= 15000 && Player.glina >= 15000 && Player.zelazo >= 15000) {
				Player.drewno -= 15000;
				Player.glina -= 15000;
				Player.zelazo -= 15000;
				win = true;
			}
			break;
	}
}
