var units = new Array();

function Unit(name, drewno, glina, zelazo, att, deff, ilosc) {
	this.name = name;
	this.drewno = drewno;
	this.glina = glina;
	this.zelazo = zelazo;
	this.att = att;
	this.deff = deff;
	units.push(this);
}
