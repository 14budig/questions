var currentNum="";
var target = "0";
var placeHolder = "0";
var looping = true;
var numbers = [0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,1];

while(looping){
	for(x = 0; x < placeHolder.length; x++){
		for(i=0; i < numbers.length; i++){
			if(numbers[i].toString() === placeHolder[x]){
				currentNum = currentNum.concat(numbers[i].toString());
				numbers.splice(i,1);
				if(x < (placeHolder.length - 1)){
					placeHolder = placeHolder.slice(0,x) + placeHolder.slice(x+1);
				} else {
					placeHolder = placeHolder.slice(0,x);
				}
			}
			if (placeHolder.length > 0 && numbers.indexOf(parseInt(placeHolder[x], 2)) == -1){
				looping = false;
			}
		}
	}
	if(currentNum == target){
		alert(currentNum);
		placeHolder = parseInt(target, 2) +1;
		target = placeHolder.toString(2);
		placeHolder = target;
		currentNum = "";
	}
};