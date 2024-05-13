display = document.getElementById("display")

function addToDisplay(input){
    display.value += input;
}

function cleardisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value)
    }
    catch(e){
        display.value = "Error";
    }
}