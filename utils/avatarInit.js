const avatarInit = (str)=> {
    const charCodeRed = str.charCodeAt(0)
    const charCodeGreen = str.charCodeAt(1) || charCodeRed
    const red=Math.pow(charCodeRed,7)%200    
    const green=Math.pow(charCodeGreen,7)%200   
    const blue=(red+green) %200    

return (`${red},${green},${blue}`)

}

export default avatarInit
