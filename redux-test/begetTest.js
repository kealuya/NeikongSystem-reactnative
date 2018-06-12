function abc (){
    var getDatePromise = ()=>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var data = 2222222222222;

                resolve(data);
            }, 500);
        });
    };
    getDatePromise().then(data=>{
        console.log("neibu:"+data);
        return data;
    }).catch(err=>{

    });

}
console.log(111);

let now = new Date();
console.log(now);

var edw = [1,2,3,4].map((v, i, a) =>  (v) );
console.log(edw);




