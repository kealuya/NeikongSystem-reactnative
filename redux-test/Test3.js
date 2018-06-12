function reduce(array, iteratee, init, context) {

    if (array == null) array = [];
    if (toString.call(array) !== '[object Array]') throw new TypeError(array + ' is not a array');

    if (iteratee == null) return array;
    if (typeof iteratee !== "function") throw new TypeError(iteratee + ' is not a function');

    var len = array.length, i = 0;

    //把iteratee绑定到context对象上
    iteratee = (function(func, context) {

        if (context === undefined) return func;

        return function(init, value, index, collection) {
            return  func.call(context, init, value, index, collection)
        }

    })(iteratee, context);

    //若不传初始值init，则规定第一个为初始值 
    if (arguments.length < 3) {
        init = array[i++]
    }
    for (; i < len; i++) {
        init = iteratee(init, array[i], i, array)
    }

    return init

}


var fe= reduce([1, 2, 3], function(init, value) {
    return init + value //自定义一个加法规则
} )

console.log(fe)