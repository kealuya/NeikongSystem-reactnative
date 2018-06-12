var logger = (store)=>(next)=>(action)=>{
    
    console.log(1111111);
        next(action);
    console.log(1111111);
}


var applyMiddleWare = (...middleWare)=>{
    var chain = [];

    

}



























