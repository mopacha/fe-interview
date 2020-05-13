
Array.prototype.flat = function (num) {
    let arr = this
    num--
    if(num<0) return
    let newArr = []
    for(i=0; i<arr.length; i++){
        if(arr[i].isArray()){
           newArr.concat([...arr[i]])
        } else {
           newArr.push(arr[i])
        } 
    }
    this.flat(num)
    return newArr  
}

const reverse = ( num, arr)=>{
    num--
    if(num<0) return
    let newArr = []
    for(i=0; i<arr.length; i++){
        if(arr[i].isArray()){
           newArr.concat([...arr[i]])
        } else {
            newArr.push(arr[i])
        } 
    }
    reverse(num, newArr)
    return newArr
    
}