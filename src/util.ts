export let  className=(str)=>{
    return str.replace(/^\s+|\s+$/g,"")
}
export let  cssAttrSymbolTransition=(str)=>{
    let text= str.replace(/[A-Z]/g,function(con){
        return `-${con.toLowerCase()}`
    })
    return text
}