const JsMath = {
    //Constants
    E       : 2.71828,
    LN2     : 2.30259,
    LN10    : 2.30259,
    LOG10E  : 1.44270,
    PI      : 3.14159,
    SQRT1_2 : 0.70711,
    SQRT2   : 1.41421,

    // Arithmetic

    abs : function (x){
        if(typeof x === 'number'){
            const arrayOfX = String(x).split('-')
            return arrayOfX.length > 1 ? Number(arrayOfX[1]) : Number(arrayOfX[0])
        }
        return TypeError
    },

    ceil : function (x){
        const arrayOfX = String(x).split('.')
        if(typeof x === 'number' && arrayOfX.length === 1 || x == parseInt(x)){
            return x
        }
        else if(typeof x === 'number'){
            return parseInt(x + 1)
        }
        return TypeError
    },

    floor : function(x){
        const arrayOfX = String(x).split('.')
        if(typeof x === 'number' && arrayOfX.length === 1){
            return x
        }
        else if(typeof x === 'number'){
            return parseInt(x)
        }
        return TypeError
    },

    round : function(x){
        const arrayOfX = String(x).split('.')
        if(typeof x === 'number' && arrayOfX.length === 1){
            return x
        }
        else if(typeof x === 'number'){
            return parseInt(x + 0.5)
        }
        return TypeError
    },

    trunc : function(x){
        if(typeof x === 'number'){
            return parseInt(x)
        }
        return TypeError
    },

    sqrt : function(x){
        if(typeof x === 'number'){
            return x **(1/2)
        }
        return TypeError
    },

    cbrt : function(x){
        if(typeof x === 'number'){
            return x **(1/3)
        }
        return TypeError
    },

    pow : function(x, y){
        if(typeof x === 'number' && typeof y === 'number'){
            return x**y
        }
        return TypeError
    },
    hypot : function(...args){
        let sum = 0;
        for(item of args){
            if(typeof item === 'number'){
                sum += item**2
            }
            return TypeError
        }
        return this.sqrt(sum)
    }

}
console.table(JsMath)
console.log(JsMath.abs(-10), JsMath.abs(10), JsMath.ceil(9.9), JsMath.ceil(9.1), JsMath.ceil(9), JsMath.ceil(9.0), JsMath.floor(9.1), JsMath.floor(9.9), JsMath.round(9.5), JsMath.round(9.4), JsMath.trunc(9.1), JsMath.trunc(9.0))