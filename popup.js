function closeAndReload() {
  chrome.tabs.getSelected(null, function(tab) {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tab.id, {code: code});
  });
  window.close();
}

function isValidURL(url) {
  var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (RegExp.test(url)) {
    return true;
  } else {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('inbox-background-url-form'),
      input = document.getElementById('background-url-input');


  input.placeholder = chrome.i18n.getMessage("placeholder");

  chrome.cookies.get({
    name: "BACKGROUND_URL",
    url: "https://inbox.google.com"
  }, function(cookie) {
    if (cookie) {
      input.value = cookie.value;
    }
  });
  var resetBtn = document.getElementById('reset-form-button'),
      saveBtn = document.getElementById('save-form-button');


  input.addEventListener('keyup', function(evt) {
    if (input.value) {
      if (!isValidURL(input.value)) {
        if (input.className.indexOf('invalid') === -1) {
          input.className += ' invalid';
        }
        saveBtn.disabled = true;
      } else {
        saveBtn.disabled = false;
        input.className = input.className.replace(/\sinvalid/,'');
      }
      resetBtn.className = resetBtn.className.replace(/\shide/,'');
    } else {
      saveBtn.disabled = false;
      resetBtn.className += ' hide';
      input.className = input.className.replace(/\sinvalid/,'');
    }
  });

  form.addEventListener('reset', function(evt) {
    saveBtn.disabled = false;
    resetBtn.className += ' hide';
    input.className = input.className.replace(/\sinvalid/,'');
  });

  form.addEventListener('submit', function(evt) {
    var value = form.elements['background_url'].value,
        cookie = {
          name: "BACKGROUND_URL",
          url: "https://inbox.google.com"
        };
    if (value) {
      cookie["value"] = value;

      var dateNow = new Date();
      var cookieDate = new Date(new Date(dateNow).setYear(dateNow.getFullYear() + 100));
      cookie["expirationDate"] = cookieDate.getTime();

      chrome.cookies.set(cookie, closeAndReload);
    } else {
      chrome.cookies.remove(cookie);
      closeAndReload();
    }
  });
});
