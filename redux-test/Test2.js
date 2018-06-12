

var exp = function(op){
    var middlewares = [];
    exp.use = function(fn){
        middlewares.push(fn);
    }
    var i = 0;
    function next(args){
        var sonExp = middlewares[i];
        i = i + 1;
        if (sonExp){
            sonExp(args,next);
        }else{
            op(args);
        }
    }

    return function newFn(args){
        next(args);
    }
} ;

var Op = function(v){
    console.log("v:" + v);
};

var expOp = exp(Op);
exp.use(function(args,next){
    console.log(1111111111);
    next(args);
    console.log(3333333333);
});
exp.use(function(args,next){
    console.log(4444444444);
    next(args);
    console.log(5555555555);
});

expOp(222222);


var Op2 = function(v){
    console.log("v222:" + v);
};

var expOp = exp(Op2);

expOp(111111);





var jiji = {
    a:111
}

var f = Object.create( jiji);
f.a = 222;

console.log(jiji.a);


















