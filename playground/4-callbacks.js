const add = (x, y, callback) => {
    setTimeout(()=>{
        callback(x+y)
    }, 2000)
}

add (1, 4, (sum) =>{
    console.log(sum)
})