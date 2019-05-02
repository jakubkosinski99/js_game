var places = new Array();
var bud = new Image();
bud.src = "img/Budynki.png";
var placeH = 100;
var placeW = 100;
var grass = document.getElementById("grass");

function place(name, x, y, level, drewno, glina, zelazo, wdrewno, wglina, wzelazo) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.level = level;
	this.y_bottom = this.y + placeH;
	this.x_right = this.x + placeW;
	this.drewno = drewno;
	this.glina = glina;
	this.zelazo = zelazo;
	this.wdrewno = wdrewno;
	this.wglina = wglina;
	this.wzelazo = wzelazo;
	this.w_budowie = false;
	this.czas_budowy = 2;
	this.aktualny_dzien = "";
	this.koniec_budowy = "";
	places.push(this);
}

place.prototype.render = function () {
	if (this.name == "Mur") {
		ctx.fillStyle = "#140500";
		ctx.font = "bold 35px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 10, this.y + placeH / 2, placeW);
		if(this.level > 0){
			document.getElementById("grass").src="img/Z_murem.png";
		}
	}else if(this.name == "Huta") {
		ctx.fillStyle = "yellow";
		ctx.font = "16px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 24, this.y + (placeH / 2) - 40, placeW);
		ctx.drawImage(bud,200,0,100,100,this.x,this.y,100,100);
	}else if(this.name == "Tartak") {
		ctx.fillStyle = "yellow";
		ctx.font = "16px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 16, this.y + (placeH / 2) - 40, placeW);
		ctx.drawImage(bud,300,0,100,100,this.x,this.y,100,100);
	}else if(this.name == "Cegielnia") {
		ctx.fillStyle = "yellow";
		ctx.font = "16px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 6, this.y + (placeH / 2) - 70, placeW);
		ctx.drawImage(bud,400,0,100,100,this.x,this.y,100,100);
	}else if(this.name == "Koszary") {
		ctx.fillStyle = "yellow";
		ctx.font = "16px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 10, this.y + (placeH / 2) - 40, placeW);
		ctx.drawImage(bud,100,0,100,100,this.x,this.y,100,100);
	}else if(this.name == "Ratusz") {
		ctx.fillStyle = "yellow";
		ctx.font = "16px Arial";
		ctx.fillText(this.name + " - " + this.level, this.x + 10, this.y + (placeH / 2) -40, placeW);
		ctx.drawImage(bud,0,0,100,100,this.x,this.y,100,100);
	}
}
function city(color) {
	this.color = color;
}

city.prototype.render = function () {
	ctx.fillStyle = "black";
	ctx.drawImage(grass, 0, 0, cw, ch);
	places.forEach(function (e) {
		e.render();
	})
}
