function getExifOrientation(DataURL){
  let byteImg = atob(DataURL.replace(/^.*,/, ''));
  let pt = 0;
  if (byteImg.charCodeAt(pt)===255&&byteImg.charCodeAt(pt+1)===216&&byteImg.charCodeAt(pt+2)===255&&byteImg.charCodeAt(pt+3)===225){
    pt += 4;
    let markerSize = 256*byteImg.charCodeAt(pt)+byteImg.charCodeAt(pt+1);
    pt += 8;
    if (byteImg.charCodeAt(pt)===77&&byteImg.charCodeAt(pt+1)===77){
      bigEndian = 1;
    }
    else if (byteImg.charCodeAt(pt)===73&&byteImg.charCodeAt(pt+1)===73){
      bigEndian = 0;
    }
    else {
      return 1;
    }
    pt += 8;
    let tagNum = byteImg.charCodeAt(pt)*(1+255*bigEndian) + byteImg.charCodeAt(pt+1)*(256-255*bigEndian);
    pt += 2;
    for (let i = 0; i < tagNum; i++){
      let tagType = byteImg.charCodeAt(pt)*(1+255*bigEndian) + byteImg.charCodeAt(pt+1)*(256-255*bigEndian);
      if (tagType === 274){
        if (bigEndian === 1){
          return byteImg.charCodeAt(pt+9);
        }
        else {
          return byteImg.charCodeAt(pt+8);
        }
      }
      pt += 12;
    }
  } else if (byteImg.charCodeAt(pt)===255&&byteImg.charCodeAt(pt+1)===216&&byteImg.charCodeAt(pt+2)===255&&byteImg.charCodeAt(pt+3)===224){
    pt += 6;
    let isIPhone = navigator.userAgent.indexOf("iPhone") >= 0 ? true : false;
    if (isIPhone&&byteImg.charCodeAt(pt)===74&&byteImg.charCodeAt(pt+1)===70&&byteImg.charCodeAt(pt+2)===73&&byteImg.charCodeAt(pt+3)===70&&byteImg.charCodeAt(pt+4)===0){
      return 6;
    } else {
      return 1;
    }
  } else {
    return 1;
  }
}
