
var dispatch = function(){
    console.log(22222222);
}

var middlewareAPI = {
    getState: 222,
    dispatch: (action) => dispatch(action)
}
var chain =  middleware => middleware(middlewareAPI)

dispatch = function(){
    console.log(344444);
}




chain(function(api){api.dispatch()})


function d() {
    this.vv=10;
}

var df =new d();
console.log(df.vv);

function dfd(df){
    df.vv=333;

}
dfd(df);
console.log(df.vv);






