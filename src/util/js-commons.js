const addEventHandle = (target, type, callback) => {
    if (target.addEventListener) target.addEventListener(type, callback)
    else target.attachEvent('on' + type, callback)
}

export {addEventHandle}