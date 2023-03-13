
export let  className=(str:string):string=>{
    return str.replace(/^\s+|\s+$/g,"")
}
export let cssAttrSymbolTransition=(str:string):string=>{
    let text= str.replace(/[A-Z]/g,function(con){
        return `-${con.toLowerCase()}`
    })
    return text
}