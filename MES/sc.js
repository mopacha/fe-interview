

//JSONP实现跨域  
//https://www.jianshu.com/p/d006b883772a


function addScript(){
    var script = document.createElement('script')
    script.src = 'http://www.sen.com/getData?callback=getData'
    document.head.appenChild(script)
    document.head.removeChild(script)

}

function getData(data){
    console.log(data)
}

addScript()
getData()



// 求整数的所有除数
// 要求： 除数不包括 1 和数字本身
// 要求： 如果该数没有除数 返回一个字符串
// 例如： 13这个数应该返回 “13 没有除数”
// 例如： 12这个数应该返回 [2,3,4,6]
// 给定数是大于 1 的

function divisors(integer) {
    var res = []
    for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
    return res.length ? res : integer + ' 没有除数'
  };
  console.log(divisors(12));



// 12:  2*2*3s
function factor(num, arr =[]){
    let i = 2
    for(;i < Math.floor(num/2); i++){
        if(num % i === 0){
            arr.push(i)
            factor(num / i, arr)
            break
        } 
    }
    if(i > num/2){
        arr.push(num)
    }
    return arr
}

function factor_str (num){
    return factor(num).join('*')
}

factor_str(100)


// npm install 的流程逻辑
// https://blog.csdn.net/qiwoo_weekly/article/details/103839779

// https://www.cnblogs.com/everlose/p/12505245.html