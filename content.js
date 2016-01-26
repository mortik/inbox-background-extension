function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

var backgroundUrl = getCookie("BACKGROUND_URL");
if (backgroundUrl) {
  if (backgroundUrl.indexOf("dropbox.com") > -1) {
    backgroundUrl += '&raw=1';
  }
  var css = '.ad:not(.a1)>.I, .ay:not(.a1)>.I, #aVMuZe:not(.m):not(.M) .ad>.I:not(.pU4C1e), #aVMuZe:not(.m):not(.M) .ay>.I, .ad.a1>*>*>.r:not(.B8), .ay.a1>*>*>.r {\
        background: none !important;\
        background-size: cover !important;\
        background-image: url("' + backgroundUrl + '") !important;\
      }\
      #aVMuZe:not(.m):not(.M) .ix.r {\
        background-image: none !important;\
        background-color: #7baaf7 !important;\
        border-radius: 3px;\
      }\
      img[src*="ic_zero_inbox"] {\
        display: none !important;\
      }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}
