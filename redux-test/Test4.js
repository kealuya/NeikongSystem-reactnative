"use strict";
function reverse(string,v ="") {
    if(string.length == 0) {
        return v;
    } else {
        v =  string.substring(0, 1) + v;
        var temp = string.substring(1, string.length);
        return reverse(temp,v);
    }
}

var str = "vs"
var x = 0
while (x < 10000){
    str = str + x
    x=x+1
}





console.time("start")
console.log(reverse(str));
console.timeEnd("start")

