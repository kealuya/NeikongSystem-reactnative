

let obj = {
    test:"0"
}

var express = function(){
    
    var funcs = [];
    //funcs: function(obj,next){XXX next() xxxx}
    
    var expr = function(obj){
        var i=0;
        var next = function(){
            var func = funcs[i];            
            i=i+1;
            if (!func) return;
            func(obj , next);
        }
        next();

    }
    
    expr.use = function(midfunc){
        funcs.push(midfunc);
    }


    return expr;

}

var app = express();

app.use(function(obj,next){
    obj.test =  obj.test + "1";
    next();
});
app.use(function(obj,next){
    obj.test =  obj.test + "2";
    next();
});
app.use(function(obj,next){
    obj.test =  obj.test + "3";
    next();
});


app(obj);