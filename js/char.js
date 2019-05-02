var move = [];
var Menu;
var kolejny = "";

function player(x, y, size, color, drewno, glina, zelazo, konnice, lucznicy, pikinierzy) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.drewno = drewno;
	this.glina = glina;
	this.zelazo = zelazo;
	this.konnice = konnice;
	this.lucznicy = lucznicy;
	this.direction = "left";
	this.pikinierzy = pikinierzy;
	this.y_bottom = this.y + this.size;
	this.x_right = this.x + this.size;
}

var be = 0;
	
	/*Funkcja wywoływana 8 razy na sekunde aktualizujaca animacje gracza*/

function bed() {
	if (be == 8) {
		be = 0;
	}
	be++;
}

setInterval(bed, 1000 / 8);

	/*Aktualizowanie gracza*/

player.prototype.render = function () {
	if (this.direction == "top") {
		ctx.drawImage(spr, 64 * be, 0, 64, 64, this.x, this.y, 64, 64);
	}
	if (this.direction == "bot") {
		ctx.drawImage(spr, 64 * be, 64 * 2, 64, 64, this.x, this.y, 64, 64);
	}
	if (this.direction == "left") {
		ctx.drawImage(spr, 64 * be, 64 * 1, 64, 64, this.x, this.y, 64, 64);
	}
	if (this.direction == "right") {
		ctx.drawImage(spr, 64 * be, 64 * 3, 64, 64, this.x, this.y, 64, 64);
	}
}

	/*Poruszanie gracza*/
player.prototype.move = function (x, y) {
	this.x += x;
	this.y += y;
}

	/*Wykrywanie na jakim budynku jest gracz i aktualizacja pozycji*/
	
player.prototype.update = function () {
	if (menuOpened == false) {
		places.forEach(function (e) {
			if (Player.y + Player.size >= e.y && Player.y <= e.y_bottom && Player.x + Player.size >= e.x && Player.x <= e.x_right) {
				kolejny = "<li>Budowla jest na maksymalnym poziomie.</li>";
				switch (e.name) {
					case "Tartak":
						if (e.level < 10 && e.level != 0) {
							kolejny = "<li>Na kolejnym poziomie wyniesie on: " + (e.wdrewno + 10) + "</li>";
							showIncome = "<li>Obecny dochód z tartaku wynosi: " + e.wdrewno + "</li>" + kolejny;
						}
						break;
					case "Cegielnia":
						if (e.level < 10 && e.level != 0) {
							kolejny = "<li>Na kolejnym poziomie wyniesie on: " + (e.wglina + 10) + "</li>";
							showIncome = "<li>Obecny dochód z cegielni wynosi: " + e.wglina + "</li>" + kolejny;
						}
						break;
					case "Huta":
						if (e.level < 10 && e.level != 0) {
							kolejny = "<li>Na kolejnym poziomie wyniesie on: " + (e.wzelazo + 10) + "</li>";
							showIncome = "<li>Obecny dochód z huty wynosi: " + e.wzelazo + "</li>" + kolejny;
						}
						break;
					case "Mur":
						if (e.level == 0) {
							kolejny = "<li>Wybuduj aby otrzymać 50 punktów obrony</li>";
						} else if (e.level == 1) {
							kolejny = "<li>Na kolejnym poziomie wyniesie ona: " + 150 + "</li>";
						} else if (e.level == 2) {
							kolejny = "<li>Na kolejnym poziomie wyniesie ona: " + 250 + "</li>";
						} else if (e.level == 3) {
							kolejny = "<li>Na kolejnym poziomie wyniesie ona: " + 400 + "</li>";
						} else if (e.level == 4) {
							kolejny = "<li>Na kolejnym poziomie wyniesie ona: " + 600 + "</li>";
						}
						showIncome = "<li>Obecna ochrona murem: " + murD + "</li>" + kolejny;
						break;
					default:
						if (move[13] == true) {
							console.log("Zmiana lokacji na: " + e.name);
							document.getElementById("current").style.height = "36px";
							setTimeout(function () {
								document.getElementById("current").innerHTML = e.name;
							}, 50);
							Menu = new menu(e.name);
							in_city = false;
						}
						showIncome = "";
						break;
				}
			}
		})
		if (move[37] == true) {
			if (this.x <= 0) {} else {
				this.move(-2, 0);
				this.direction = "left";
			}
		}
		if (move[38] == true) {
			if (this.y <= 0) {} else {
				this.move(0, -2);
				this.direction = "top";
			}
		}
		if (move[39] == true) {
			if (this.x + this.size >= cw) {} else {
				this.move(2, 0);
				this.direction = "right";
			}
		}
		if (move[40] == true) {
			if (this.y + this.size + 25 >= ch) {} else {
				this.move(0, 2);
				this.direction = "bot";
			}
		}
	}
}







	/*Wykrywanie nacisnietych klawiszy*/

window.addEventListener("keydown", function (e) {
	if (menuOpened == false) {
		if (e.keyCode == 37) {
			move[e.keyCode] = true;
		}
		if (e.keyCode == 38) {
			move[e.keyCode] = true;
		}
		if (e.keyCode == 39) {
			move[e.keyCode] = true;
		}
		if (e.keyCode == 40) {
			move[e.keyCode] = true;
		}
		if (e.keyCode == 13) {
			move[e.keyCode] = true;
		}
	}
})

window.addEventListener("keyup", function (e) {
	if (menuOpened == false) {
		if (e.keyCode == 37) {
			move[e.keyCode] = false;
		}
		if (e.keyCode == 38) {
			move[e.keyCode] = false;
		}
		if (e.keyCode == 39) {
			move[e.keyCode] = false;
		}
		if (e.keyCode == 40) {
			move[e.keyCode] = false;
		}
		if (e.keyCode == 13) {
			move[e.keyCode] = false;
		}
	}
})
