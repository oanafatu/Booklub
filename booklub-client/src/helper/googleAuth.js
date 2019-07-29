import doFetch from '../fetch';

const startApp = () => {
  window.gapi.load('auth2', function(){
    window.auth2 = window.gapi.auth2.init( {
      client_id: '39669963550-ej271uev3v1lfjts7oope1aq2dmu46b7.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    });
    attachSignin(window.document.getElementById('signin'));
  });
};

const attachSignin = element => {
  window.auth2.attachClickHandler(element, {},
    function(googleUser) {
      
      doFetch('authenticate/', 'POST', {
        idToken: googleUser.Zi.id_token
      })
      .then(data => {
        if (data.userId) {
          window.location = "/";
        }
      })

    }, function(error) {
      console.log(error);
    }
  );
}

const signOut = () => {
  var auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    window.document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = '/login';
  });
};

const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default {
  getCookie,
  signOut,
  startApp: () => window.addEventListener('load', () => startApp())
}