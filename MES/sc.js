

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

















// 12:  2*2*3





function factor(num, arr =[], flat =true){
    
    for(let i = 2; i < num; i++){
        if(num % i === 0){
            arr.push(i)
            factor(num / i, arr)
            break
        } 
    }

    return arr
}

function factor_str (num){
    return factor(num).join('*')
}

factor_str(100)





function f1(num){

    var num1 = num

    var li = []

    var i = 1

    while (i<num1) {

        i += 1

        while (num1 % i == 0) {

            num1/=i

            li.push(i)

        }

    }

    console.log(num+'='+li.join('*'))

}

f1(90)