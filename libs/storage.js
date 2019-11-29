function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
getFaceList = function() {
    var ret = JSON.parse(localStorage.getItem('facelist'))
    if(ret == null)
        return []
    else
        return ret
}

addFaceList = function(title, image, ai_emo, hum_emo, successFlag) {
    arr = getFaceList()
    var obj = {
      id : uuid(),
      image : image,
      title : title,
      emotions: {ai:ai_emo, hum:hum_emo},
      success: successFlag
    }
    arr.push(obj)
    localStorage.setItem('facelist',JSON.stringify(arr))  
}

removeFaceList = function(id) {
    arr = exports.getFaceList()
    var idx = arr.findIndex(function(v) { return v.id == id })
    if(idx > -1) arr.splice(idx,1)
}

getObjectList = function() {

  var ret = JSON.parse(localStorage.getItem('objectlist'))

  if(ret == null)

      return []

  else

      return ret

}



addObjectList = function(title, img, ai_objs, hum_objs, rect) {

  arr = getObjectList()

  var obj = {

    id : uuid(),

    title : title,
    image : img,
    objects : {ai: ai_objs, hum : hum_objs},
    rect: []
  }

  arr.push(obj)

  localStorage.setItem('objectlist',JSON.stringify(arr))  

}



removeObjectList = function(id) {

  arr = getObjectList()

  var idx = arr.findIndex(function(v) { return v.id == id })

  if(idx > -1) arr.splice(idx,1)

}
