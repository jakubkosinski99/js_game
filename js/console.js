var currentLineChars = 0,
    cheatOpened = false,
	cons = document.getElementById("console"),
	lines = 0,
	currentLine = 0,
	latest = new Array(),
	next = latest.length;
window.addEventListener("keyup", function (e) {
	if (e.keyCode == 192) {
		if (cons.style.display == "none") {
			currentLine = 0;
			lines = 0;
			cons.style.display = "block";
			consoleOpen();
			cheatopened = true;
			latest = new Array(),
			next = latest.length;
			
		} else {
			currentLine = 0;
			lines = 0;
			cons.style.display = "none";
			cons.innerHTML = "";
			cheatopened = false;
			delete(latest);
			next = 0;
		}
	}
});

var consoleOpen = function () {
	newLine("player~: ");
}



function newLine(str, clr, size) {
	var line = document.createElement("div");
	var start = document.createElement("span");
	start.style.color = "#f82424";
	if (clr != null) {
		start.style.color = clr;
	}
	start.style.fontWeight = "700";
	line.style.fontSize = "18px";
	if (size != null) {
		line.style.fontSize = size;
	}
	start.innerHTML = str;
	line.setAttribute("id", "line_" + lines);
	line.setAttribute("class", "line");
	line.appendChild(start);
	var text = document.createElement("span");
	text.setAttribute("id", "text_" + lines);
	line.appendChild(text);
	cons.appendChild(line);
	whereIam();
	lines++;
}



window.addEventListener("keypress", function (e) {
	if (cons.style.display == "block") {
		var current = document.getElementById("text_" + currentLine);
		if (e.keyCode == 13) {
			make(current.innerHTML);
			whereIam();
		} else {
			var letter = String.fromCharCode(e.keyCode);
			if (current.innerHTML.length <= 30) {
				current.innerHTML += letter;
			}
			whereIam();
		}
	}
});

window.addEventListener("keydown", function (e) {
	if (cons.style.display == "block") {
		var current = document.getElementById("text_" + currentLine);
		if (e.keyCode == 8) {
			current.innerHTML = current.innerHTML.substring(0, current.innerHTML.length - 1);
		}
		if(e.keyCode == 38) {
			if(latest[next] != undefined) {current.innerHTML = latest[next];}
			if(next-1 >= 0) {
				next = next - 1
			}
			else {
				next = latest.length - 1;
			}
		}
		if(e.keyCode == 40) {
			if(latest[next] != undefined) {current.innerHTML = latest[next];}
			if(next + 1 <= latest.length - 1) {
				next = next + 1;
			}
			else {
				next = 0;
			}			
		}
	}
})


function whereIam() {
	var line = document.getElementById("line_" + currentLine);
	var cursors = document.getElementsByClassName("cursor");
	for (var x = 0; x < cursors.length; x++) {
		cursors[x].parentElement.removeChild(cursors[x]);
	}
	var cursor = document.createElement("span");
	cursor.setAttribute("class", "cursor");
	cursor.innerHTML = "|";
	line.appendChild(cursor);
}
 
function make(str) {
	str = str.toLowerCase();
	var value,
		echo;
	if (str == "cls") {
		str = "clear";
	}
	if(str != "") {
		latest.push(str);
		next = latest.length - 1;		
	}

	if (str.slice(0, 3) == "add") {
		value = parseInt(str.slice(8));
		str = str.slice(0, 8);
		str = str.replace(" ", "")
	}
	
	if (str.slice(0, 4) == "echo") {
		echo = (str.slice(5));
		str = str.slice(0, 5);
		str = str.replace(" ", "");

	}
	switch (str) {
		case "help":
			newLine("system~:")
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 help - Pokazuje wszystkie dostępne komendy", "white", "13px");

			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 cls | clear - Czyści konsole", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 echo - Wypisuje tekst w konsoli", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 quit - Wyłącza grę", "white", "13px");

			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addWood * - Dodaje podaną ilość drewna", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addClay * - Dodaje podaną ilość gliny", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addIron * - Dodaje podaną ilość żelaza", "white", "13px");

			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addCava * - Dodaje podaną ilość konnicy", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addPike * - Dodaje podaną ilość pikinierów", "white", "13px");
			newLine("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 addArch * - Dodaje podaną ilość łuczników", "white", "13px");


			newLine("player~: ");
			currentLine += 12;
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "clear":
			currentLine = 0;
			lines = 0;
			cons.innerHTML = "";
			newLine("player~: ");
			break;
		case "addwood":
			if (!(isNaN(value)) && value > 0) {
				Player.drewno += value;
				newLine("system~: Dodano " + value + " drewna");
				newLine("player~: ");
				currentLine += 2;
				if (lines + 1 > 30) {
					cons.innerHTML = "";
					lines = 0;
					currentLine = 0;
					newLine("player~: ");
					whereIam();
				}
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "addclay":
			if (!(isNaN(value)) && value > 0) {
				Player.glina += value;
				newLine("system~: Dodano " + value + " gliny");
				newLine("player~: ");
				currentLine += 2;
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "addiron":
			if (!(isNaN(value)) && value > 0) {
				Player.zelazo += value;
				newLine("system~: Dodano " + value + " zelaza");
				newLine("player~: ");
				currentLine += 2;
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;

		case "addcava":
			if (!(isNaN(value)) && value > 0) {
				Player.konnice += value;
				newLine("system~: Dodano " + value + " konnicy");
				newLine("player~: ");
				currentLine += 2;
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "addpike":
			if (!(isNaN(value)) && value > 0) {
				Player.pikinierzy += value;
				newLine("system~: Dodano " + value + " pikinierów");
				newLine("player~: ");
				currentLine += 2;
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "addarch":
			if (!(isNaN(value)) && value > 0) {
				Player.lucznicy += value;
				newLine("system~: Dodano " + value + " łuczników");
				newLine("player~: ");
				currentLine += 2;
			} else {
				newLine("system~: Podaj poprawną liczbe");
				newLine("player~: ");
				currentLine += 2;
			}
			if (lines + 1 > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;
		case "echo":
				newLine("system~: " + echo);
				newLine("player~: ");
				currentLine += 2;	
				break;
        case "quit":
                window.close();
				break;          
		default:
			newLine("system~: Wszystkie komendy znajdują się pod help");
			newLine("player~: ");
			currentLine += 2;
			if (lines > 30) {
				cons.innerHTML = "";
				lines = 0;
				currentLine = 0;
				newLine("player~: ");
				whereIam();
			}
			break;

	}
}
