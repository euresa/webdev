

let opsArray = ["+", "-", "/", "*", "(", ")"];
let specialButtons = ['calculate', 'clear'];

for (let i = 0; i<10; i++){
	if (i % 5 == 0){
		document.getElementById('calculator').innerHTML += '<br>'
	}
	document.getElementById('calculator').innerHTML += makeButton(i);
}
document.getElementById('calculator').innerHTML += "<br>";


for (let op in opsArray) {
	document.getElementById('calculator').innerHTML +=
											 makeButton(opsArray[op]);
}

for (let i in specialButtons){
	document.getElementById('calculator').innerHTML += 
									"<br>"+makeButton(specialButtons[i]);
}

function makeButton(i){
	let funcString = "displayValue('"+i+"')";
	return '<button onclick ='+funcString+'>' + i + '</button>';
}

function displayValue(i){
	if (i == "calculate"){
		calculateValue("calculatorDisplay");
	} else if (i == "clear"){
		clearInnerHTML("calculatorDisplay");
	} else {
		document.getElementById("calculatorDisplay").innerHTML += i;
	}
}

function calculateValue(id){
	let value = eval(document.getElementById(id).innerHTML);
	document.getElementById(id).innerHTML = value;
}

function clearInnerHTML(id){
	document.getElementById(id).innerHTML = "";
}