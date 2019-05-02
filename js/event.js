var events = new Array();
var eventCount = 1;
var currentEvent = 1;


var lastResult,
	PlostP = PlostK = PlostL = ElostK = ElostL = ElostP = EleftK = EleftL = EleftP = 0,
	enemyP,
	enemyL,
	enemyK,
	PlostD,
	PlostG,
	PlostZ;

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function event(dayS, dayE, eventK, eventL, eventP, loseperc) {
	this.dayS = dayS;
	this.dayE = dayE;
	this.konnice = eventK;
	this.lucznicy = eventL;
	this.pikinierzy = eventP;
	this.result = "none";
	this.loseperc = loseperc;
	this.executeDay = getRandom(this.dayS, this.dayE);
	events[eventCount] = this;
	eventCount++;
}


event.prototype.execute = function () {

	enemyK = this.konnice;
	enemyL = this.lucznicy;
	enemyP = this.pikinierzy;

	var ekD = konnica.deff * enemyK,
		epD = pikinier.deff * enemyP,
		elD = lucznik.deff * enemyL;
	var ekA = konnica.att * enemyK,
		epA = pikinier.att * enemyP,
		elA = lucznik.att * enemyL;
	var pkD = konnica.deff * Player.konnice,
		ppD = pikinier.deff * Player.pikinierzy,
		plD = lucznik.deff * Player.lucznicy;
	var pkA = konnica.att * Player.konnice,
		ppA = pikinier.att * Player.pikinierzy,
		plA = lucznik.att * Player.lucznicy;
	var ED = ekD + epD + elD;
	var EA = ekA + epA + elA;
	var PD = pkD + ppD + plD + murD;
	var PA = pkA + ppA + plA;

	var dif_raz = PD - EA;
	var Pcasult = Math.pow(this.loseperc, 3);
	Pcasult /= dif_raz;
	Pcasult = Math.round(Pcasult);
	if (Pcasult > 5) {
		PlostK = PlostL = PlostP = 0;
		while (Player.konnice > 0 && Pcasult >= konnica.deff) {
			Pcasult -= konnica.deff;
			Player.konnice--;
			PlostK++;
		}
		while (Player.lucznicy > 0 && Pcasult >= lucznik.deff) {
			Pcasult -= lucznik.deff;
			Player.lucznicy--;
			PlostL++;
		}
		while (Player.pikinierzy > 0 && Pcasult >= pikinier.deff) {
			Pcasult -= pikinier.deff;
			Player.pikinierzy--;
			PlostP++;
		}

	}
	var dif_dwa = ED - PA;
	var Ecasult = Math.pow(this.loseperc, 3);
	Ecasult /= dif_dwa;
	Ecasult = Math.round(Ecasult);

	if (Ecasult > 5) {
		ElostK = ElostL = ElostP = 0;
		while (Player.konnice > 0 && Ecasult >= konnica.deff) {
			Ecasult -= konnica.deff;
			ElostK++;
		}
		while (Player.lucznicy > 0 && Ecasult >= lucznik.deff) {
			Ecasult -= lucznik.deff;
			ElostL++;
		}
		while (Player.pikinierzy > 0 && Ecasult >= pikinier.deff) {
			Ecasult -= pikinier.deff;
			ElostP++;
		}
		EleftK = enemyK - ElostK,
			EleftP = enemyP - ElostP,
			EleftL = enemyL - ElostL;

	}

	if (PD >= EA) {

		lastResult = "WYGRANA";
		this.result = "wygrana";
		if (currentEvent == events.length - 1) {
			if (this.loseperc + 2 > 80) {
				this.loseperc = 80;
			} else {
				this.loseperc += 2;
			}
			PlostD = 0;
			PlostG = 0;
			PlostZ = 0;
			var f = new event(Math.round(this.dayS + this.dayS * 0.16), Math.round(this.dayE + this.dayE * 0.16), Math.round(this.konnice * 1.05) + EleftK, Math.round(this.lucznicy * 1.05) + EleftL, Math.round(this.pikinierzy * 1.05) + EleftP, this.loseperc);
		}
		currentEvent++;

	} else {
		PlostP = "100%";
		PlostK = "100%";
		PlostL = "100%";
		lastResult = "PORAZKA";
		this.result = "porazka";
		Player.pikinierzy = 0;
		Player.lucznicy = 0;
		Player.konnice = 0;
		var l = parseFloat("0." + this.loseperc);
		if (this.loseperc == 100) {
			var l = 1;
		}
		if (Math.round(Player.drewno - Player.drewno * l) >= 0) {
			PlostD = Math.round(Player.drewno * l)
			Player.drewno = Math.round(Player.drewno - Player.drewno * l);
		}
		if (Math.round(Player.zelazo - Player.zelazo * l) >= 0) {
			PlostG = Math.round(Player.zelazo * l)
			Player.zelazo = Math.round(Player.zelazo - Player.zelazo * l);
		}
		if (Math.round(Player.glina - Player.glina * l) >= 0) {
			PlostZ = Math.round(Player.glina * l)
			Player.glina = Math.round(Player.glina - Player.glina * l);
		}
		if (currentEvent == events.length - 1) {
			if (this.loseperc + 2 > 80) {
				this.loseperc = 80;
			} else {
				this.loseperc += 2;
			}
			var f = new event(Math.round(this.dayS + this.dayS * 0.16), Math.round(this.dayE + this.dayE * 0.16), Math.round(this.konnice * 1.05), Math.round(this.lucznicy * 1.05), Math.round(this.pikinierzy * 1.05), this.loseperc);
		}
		currentEvent++;
	}
	document.getElementById("rap").innerHTML += '<small>(Kliknij aby zamknąć)</small>'
	document.getElementById("rap").innerHTML += '<h2>Raport z ostatniej walki</h2>'
	document.getElementById("rap").innerHTML += '<h2>' + this.result + '</h2>'
	document.getElementById("rap").innerHTML += '<h3>Jednostki wroga</h3>'
	document.getElementById("rap").innerHTML += '<p>Konnice: ' + this.konnice + '</p>'
	document.getElementById("rap").innerHTML += '<p>Łucznicy: ' + this.lucznicy + '</p>'
	document.getElementById("rap").innerHTML += '<p>Pikinierzy: ' + this.pikinierzy + '</p>'
	document.getElementById("rap").innerHTML += '<h3>Straty</h3>'
	document.getElementById("rap").innerHTML += '<p>Konnice: ' + PlostK + '</p>'
	document.getElementById("rap").innerHTML += '<p>Łucznicy: ' + PlostL + '</p>'
	document.getElementById("rap").innerHTML += '<p>Pikinierzy: ' + PlostP + '</p>'
	if(this.result == "wygrana") {
		PlostD = 0;
		PlostG = 0;
		PlostZ = 0;
		console.log("ELO");
	}
	document.getElementById("rap").innerHTML += '<p>Drewno: ' + PlostD + '</p>'
	document.getElementById("rap").innerHTML += '<p>Glina: ' + PlostG + '</p>'
	document.getElementById("rap").innerHTML += '<p>Zelazo: ' + PlostZ + '</p>'

	document.getElementById("rap").style.padding = "40px";
	document.getElementById("lay").style.display = "block"
}

document.getElementById("rap").addEventListener("click", function () {
	document.getElementById("rap").innerHTML = "";
	document.getElementById("rap").style.padding = "0px";
	document.getElementById("lay").style.display = "none"
})
