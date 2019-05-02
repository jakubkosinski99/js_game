var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
	window.setTimeout(callback, 1000 / 60)
};

var canvas,
	ch,
	cw,
	ctx,
	in_city,
	win,
	lose,
	dzien,
	spr,
	City,
	Player,
	r,
	k,
	t,
	c,
	h,
	mur,
	konnica,
	lucznik,
	pikinier,
	murD,
	attack,
	dayi,
	zasoby,
	przyrost,
	wojsko,
	raport,
	e1,
	e2,
	e3,
	e4,
	e5,
	zarD,
	zarG,
	zarZ,
	escmenu,
	menuOpened,
	showIncome = "";


/*Canvas*/

var startGame = function () {
	canvas = document.getElementById("x");
	canvas.height = 800;
	canvas.width = 800;
	ch = canvas.height;
	cw = canvas.width;
	ctx = canvas.getContext("2d");

	/*Budynki w miescie*/

	places.splice(0, places.length);
	r = new place("Ratusz", cw / 2 - placeW / 2,140, 20, 0, 0, 0, 0, 0, 0);
	k = new place("Koszary", 140, 300, 20, 0, 0, 0, 0, 0, 0);
	t = new place("Tartak", 660 - placeW, 300, 0, 30, 30, 20, 0, 0, 0);
	c = new place("Cegielnia",  660 - placeW, 495, 0, 30, 30, 20, 0, 0, 0);
	h = new place("Huta", 140, 495, 0, 15, 20, 30, 0, 0, 0);
	mur = new place("Mur", 5, 5, 0, 15, 20, 30, 0, 0, 0);


	/*Jednostki*/
	konnica = new Unit("Konnica", 5, 5, 20, 30, 5);
	lucznik = new Unit("Łucznik", 10, 10, 10, 15, 15);
	pikinier = new Unit("Pikinier", 20, 5, 5, 5, 30);

	/*Elementy html*/

	attack = document.getElementById("attack");
	dayi = document.getElementById("dzien");
	zasoby = document.getElementById("zas");
	przyrost = document.getElementById("przyrost");
	wojsko = document.getElementById("wojsko");
	raport = document.getElementById("raport");
	escmenu = document.getElementById("menu");
	document.getElementById("current").style.height = "0";
	document.getElementById("current").innerHTML = "";
	escmenu.style.display = "none";

	/*Eventy*/

	events.splice(0, events.length);
	eventCount = 1;
	currentEvent = 1;

	e1 = new event(14, 15, 5, 5, 5, 10);
	e2 = new event(29, 30, 10, 7, 4, 20);
	e3 = new event(38, 39, 37, 27, 12, 20);
	e4 = new event(56, 57, 55, 36, 16, 30);
	e5 = new event(75, 76, 85, 40, 12, 50);

	/*Inne*/

	zarD = 0;
	zarG = 0;
	zarZ = 0;
	menuOpened = false;
	murD = 0;
	in_city = true;
	win = false;
	dzien = 1;
	spr = new Image();
	spr.src = "spr.png";
	City = new city("black");
	Player = new player(cw / 2, ch / 2, 64, "green", 80, 80, 80, 0, 0, 0);
	normalsound.play();
	losesound.stop();
	sy = ch / 2;
}

	/*Start gry*/

startGame();

	/*Restart gry*/

function restart() {
	startGame();
}
	/*Renderowanie*/
var gameInit = function () {
	City.render();
	Player.render();
}

	/*Funkcja pomocnicza*/
var v = 0;
var onlyOnce = function (task) {
	if (v == 0) {
		task;
		v++;
	}
}

gameInit();

var g = 0,
	d = 0,
	z = 0;

	/*Aktualizowanie gry*/
var updateGame = function () {
	if (win == true) {
		winner();
	} else {
		if (in_city) {
			Player.update();
			gameInit();

		} else {
			onlyOnce(ctx.clearRect(0, 0, cw, ch));
			Menu.render();
			Menu.update();
			Menu.renderOptions();
		}

	}

	dayi.innerHTML = "Dzień: " + dzien;

	if (showIncome != "") {
		zasoby.innerHTML = showIncome;
	} else {
		zasoby.innerHTML = "<li>Drewno: " + Player.drewno + "</li><li>Glina: " + Player.glina + "</li><li>Zelazo: " + Player.zelazo + "</li>";
	}
	if (events[currentEvent] != null) {
		var days = events[currentEvent].executeDay - dzien;

		var d = " dni";
		if (days == 1) {
			d = " dzien";
		}
		attack.innerHTML = "Wojska przeciwnika dotrą za " + days + d;
	}

	g = c.wglina;
	d = t.wdrewno;
	z = h.wzelazo;


	if (lastResult == "WYGRANA" || lastResult == "PORAZKA") {
		raport.innerHTML = "Raport ostatniej walki<br><br>" + lastResult + "<br><br>Jednostki wroga<br><br> Pikinierzy: " + enemyP + "<br>Konnice: " + enemyK + "<br>Lucznicy: " + enemyL + "<br><br>Straty<br><br> Pikinierzy: " + PlostP + "<br>Konnice: " + PlostK + "<br>Lucznicy: " + PlostL + "<br>";
	} else {
		raport.innerHTML = "";

	}

	przyrost.innerHTML = "Przyrost dzienny <br><br>Drewno: " + d + "<br>Glina: " + g + "<br>Zelazo: " + z;
	wojsko.innerHTML = "Wojsko<br><br>Konnice: " + Player.konnice + "<br> Łucznicy: " + Player.lucznicy + "<br>Pikinierzy: " + Player.pikinierzy + ""

	if (menuOpened == true) {
		ctx.fillStyle = "rgba(0,0,0,0.8)";
		ctx.fillRect(0, 0, cw, ch);
	}



	animate(updateGame);
}

zarD = 0;
zarG = 0;
zarZ = 0;

	/*Następny dzień*/

function nextRound() {
	if (menuOpened == false) {
		if (win == false) {

			dzien++;
			t.aktualny_dzien = dzien;
			c.aktualny_dzien = dzien;
			h.aktualny_dzien = dzien;
			mur.aktualny_dzien = dzien;
			if (dzien == t.koniec_budowy) {
				t.w_budowie = false;
				t.level++
					if (t.level == 1) {
						t.drewno = 10;
						t.glina = 10;
						t.zelazo = 10;
						t.wdrewno = 10;
					}
				if (t.level == 2) {
					t.drewno = 20;
					t.glina = 20;
					t.zelazo = 20;
					t.wdrewno = 20;
				}
				if (t.level == 3) {
					t.drewno = 30;
					t.glina = 30;
					t.zelazo = 30;
					t.wdrewno = 30;
					t.czas_budowy = 3;
				}
				if (t.level == 4) {
					t.drewno = 40;
					t.glina = 40;
					t.zelazo = 40;
					t.wdrewno = 40;
				}
				if (t.level == 5) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 50;
				}
				if (t.level == 6) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 60;
					t.czas_budowy = 5;
				}
				if (t.level == 7) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 70;
				}
				if (t.level == 8) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 80;
				}
				if (t.level == 9) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 90;
					t.czas_budowy = 7;
				}
				if (t.level == 10) {
					t.drewno = 40;
					t.glina = 50;
					t.zelazo = 20;
					t.wdrewno = 100;
				}
				t.koniec_budowy = "";
			}
			if (dzien == c.koniec_budowy) {
				c.w_budowie = false;
				c.level++;
				if (c.level == 1) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 10;
				}
				if (c.level == 2) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 20;
				}
				if (c.level == 3) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 30;
					c.czas_budowy = 3;
				}
				if (c.level == 4) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 40;
				}
				if (c.level == 5) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 50;
				}
				if (c.level == 6) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 60;
					c.czas_budowy = 5;
				}
				if (c.level == 7) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 70;
				}
				if (c.level == 8) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 80;
				}
				if (c.level == 9) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 90;
					c.czas_budowy = 7;
				}
				if (c.level == 10) {
					c.drewno = 10;
					c.glina = 10;
					c.zelazo = 10;
					c.wglina = 100;
				}
				c.koniec_budowy = "";
			}
			if (dzien == h.koniec_budowy) {
				h.w_budowie = false;
				h.level++;
				if (h.level == 1) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 10;
				}
				if (h.level == 2) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 20;
				}
				if (h.level == 3) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 30;
					h.czas_budowy = 3;
				}
				if (h.level == 4) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 40;
				}
				if (h.level == 5) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 50;
				}
				if (h.level == 6) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 60;
					h.czas_budowy = 5;
				}
				if (h.level == 7) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 70;
				}
				if (h.level == 8) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 80;
				}
				if (h.level == 9) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 90;
					h.czas_budowy = 7;
				}
				if (h.level == 10) {
					h.drewno = 10;
					h.glina = 10;
					h.zelazo = 10;
					h.wzelazo = 100;
				}
				h.koniec_budowy = "";
			}
			if (dzien == mur.koniec_budowy) {
				mur.w_budowie = false;
				mur.level++;
				if (mur.level == 1) {
					mur.drewno = 200;
					mur.glina = 50;
					mur.zelazo = 10;
					murD = 50;
					mur.czas_budowy = 3;
				}
				if (mur.level == 2) {
					mur.drewno = 300;
					mur.glina = 200;
					mur.zelazo = 50;
					murD = 150;
					mur.czas_budowy = 5;
				}
				if (mur.level == 3) {
					mur.drewno = 200;
					mur.glina = 500;
					mur.zelazo = 100;
					murD = 250;
					mur.czas_budowy = 7;
				}
				if (mur.level == 4) {
					mur.drewno = 500;
					mur.glina = 1000;
					mur.zelazo = 400;
					murD = 400;
					mur.czas_budowy = 9;
				}
				if (mur.level == 5) {
					mur.drewno = "MAKS";
					mur.glina = "MAKS";
					mur.zelazo = "MAKS";
					murD = 600
				}
				mur.koniec_budowy = "";
			}
			Player.drewno += t.wdrewno;
			Player.glina += c.wglina;
			Player.zelazo += h.wzelazo;
			zarD += t.wdrewno;
			zarG += c.wglina;
			zarZ += h.wzelazo;
			if (currentEvent <= events.length - 1) {
				if (dzien == events[currentEvent].executeDay) {
					events[currentEvent].execute();
				}
			}
		}
	}
}


	/*Funkcja wywołana przy wybudowie pałacu*/

sy = ch / 2;
function winner() {
	document.getElementById("current").style.height = "0";
	document.getElementById("current").innerHTML = "";
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, cw, ch);
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	var s = "WYGRALES";
	var width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy + 250);
	var at = parseInt(currentEvent) - 1
	s = "Odbyło się " + at + " ataków wroga";
	width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy);
	s = "Łączna ilość zarobionych surowców";
	width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy - 200);

	s = "Drewno: " + zarD;
	width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy - 150);

	s = "Glina: " + zarG;
	width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy - 100);

	s = "Zelazo: " + zarG;
	width = Math.round(ctx.measureText(s).width);
	ctx.fillText(s, cw / 2 - width / 2, sy - 50);

	if (menuOpened == false) {
		sy += 1;
		normalsound.stop();
		losesound.play();
	}
	if (sy > ch + 250) {
		ctx.font = "50px Arial";
		s = "THE END";
		width = Math.round(ctx.measureText(s).width);
		ctx.fillText(s, cw / 2 - width / 2, ch / 2);
	}
}

	/*Wznawianie gry*/

function resume() {
	if (menuOpened == true) {
		escmenu.style.display = "none";
		menuOpened = false;
		if (win == false) {
			normalsound.play();
			losesound.stop();
		} else if (win == true) {
			normalsound.stop();
			losesound.play();
		}
	}
}

	/*Pauza*/

window.addEventListener("keydown", function (e) {
	if (e.keyCode == 27) {
		if (menuOpened == false) {
			escmenu.style.display = "flex";
			menuOpened = true;
			if (win == false) {
				normalsound.stop();
				losesound.stop();
			} else if (win == true) {
				normalsound.stop();
				losesound.stop();
			}
		}
	}
});




animate(updateGame);
