var numsBtn = document.querySelectorAll(".number");
var resultDisp = document.querySelector(".display");
var opBtn = document.querySelectorAll(".operator");

for(var i = 0; i < numsBtn.length; i++)
numsBtn[i].addEventListener("click", numPad);

for(var i = 0; i < opBtn.length; i++)
opBtn[i].addEventListener("click", getOp);

/*check for key press*/
window.addEventListener("keydown", (key) => {

  // alert(key.which);
  if((key.which >= 96 && key.which <= 105)||(key.which >= 48 && key.which <= 57)) /*0 to 9 */
  document.getElementById(key.key + "-btn").click();
  else if(key.which == 106 || key.which == 107 || key.which == 109 || key.which == 111) /* (*) (+) (-) (/)  */
  document.getElementById(key.which + "-btn").click();
  else if(key.which == 13) // =
  getResult();
  else if(key.which == 110 || key.which == 110) //.
  document.getElementById(key.which + "-btn").click();
});


var opFlag = false;
var newCal = true;
var deciFlag = [false, false];
var value = [0,0];
var index = 0;
var op = "";


document.querySelector(".decimal").addEventListener("click", putDecimal);

function putDecimal() {

if(opFlag || newCal){
resultDisp.value = "";
opFlag = false;
deciFlag[index] = false;
}

  if(!deciFlag[index]){
    deciFlag[index] = true;
    newCal = false;
    resultDisp.value += this.value;
    value[index] = resultDisp.value;
  }
}

/*save the two operands*/

function numPad() {

  if(newCal){
    resultDisp.value="";
    newCal = false;
    deciFlag = [false, false];
  }

  if(!opFlag){
    resultDisp.value += this.value;
    value[index] = resultDisp.value;
  }else {
    value[index] = resultDisp.value = this.value;
    opFlag = false;
  }
}

/*save last computation type*/

function getOp(){
  if(value[0] != undefined){
    op = this.value;
    opFlag = true;
    index = 1;
  }
}


/*reset calculator state*/
document.querySelector(".reset").addEventListener("click", reset);

function reset() {
  opFlag = false;
  value = [0,0];
  index = 0;
  newCal = true;
  op = "";
  resultDisp.value = "0";
  deciFlag = [false, false];
}

/* operation result button click handler*/

document.querySelector(".result").addEventListener("click", getResult);

function getResult(){

if(op == "")
return;

  if(value[0] == "." || value[1] == "."){
  reset();
  return;
}
  /*select the operation based on op string*/
  switch(op){
    case "+":
    resultDisp.value = compute(value, add);
    break;
    case "-":
    resultDisp.value = compute(value, sub);
    break;
    case "x":
    resultDisp.value = compute(value, multi);
    break;
    case "/":
    resultDisp.value = compute(value, div);
    break;
  }

  /*get ready for next computation and  save last computation result*/
  value = [];
  value[0]= resultDisp.value;
  newCal = true;
  index = 0;
  opFlag = false;
  op = "";

  for(var i = 0; i < index ; i++)
  if(deciFlag[i] == true)
  deciFlag[0] = true;

  deciFlag[1] = false;
}

/* Computation functions */

function compute(value,operation) {
  // alert(value[0]);
  // alert(value[1]);
  // alert(op);
  return parseFloat(operation(value).toFixed(5));
}


function add(value){
  return Number(value[0]) + Number(value[1]);
}

function sub(value){
  return Number(value[0]) - Number(value[1]);
}

function multi(value){
  return Number(value[0]) * Number(value[1]);
}

function div(value){
  return Number(value[0]) / Number(value[1]);
}
