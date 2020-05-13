var arrString = 'abcdaabc';

const result = arrString.split('').reduce(function(res, cur) {
 
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})



const res = [1, 2].reduce(function(res, cur) { 
    console.log(res,cur)
    res.push(cur + 1); 
    return res; 
}, [])

console.log(res)