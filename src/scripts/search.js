var searchFunctions = {
  initialize: function() {
    var self=this;
    self.initializeListeners();
    console.log('search');

    self.loadSiteData();
    self.loadStopWords();
    self.firebaseInit();

    self.checkLogin();

  },
  initializeListeners: function() {
    var self=this;
    console.log('listen');
    var jsonButton = document.querySelector('#json');
    jsonButton.addEventListener('click', function(e) {

      self.firebaseSet(self.siteData, 'users/' + self.uid + '/entries');
      self.firebaseSet(self.stopWords, 'users/' + self.uid + '/stopwords');
    });
    var getButton = document.querySelector("#get");
    getButton.addEventListener('click', function(e) {
      var p = self.firebaseGet('entries');
      p.then(function(data) {
        console.log('got it');
      }),
      function(error) {
        console.log('failed');
      };

      var s = self.firebaseGet('stopWords');
      s.then(function(data) {
        console.log('got stopwords');
      }),
      function(error) {
        console.log('failed');
      }
    });

    var login = document.querySelector('#login');
    login.addEventListener('click', function() {
      self.login()
    });
    var logout = document.querySelector('#logout');
    logout.addEventListener('click', function() {
      self.logout();
      console.log('logout button');
    });

    var testLink = document.querySelector('#test-link');
    var loggedOut = document.querySelector('#loggedout-screen');
    var loggedOutActive = loggedOut.classList.contains('log-screen--active');

    testLink.addEventListener('click', function() {
      loggedOut.classList.remove('log-screen--active');
      loggedOut.classList.add('log-screen--out');
    });
    var testLinkToo = document.querySelector('#test-link-too');
    testLinkToo.addEventListener('click', function() {
      loggedOut.classList.remove('log-screen--disabled');
      loggedOut.classList.add('log-screen--in');
    });
    var testLinkShake = document.querySelector('#test-link-shake');
    testLinkShake.addEventListener('click', function() {
      loggedOut.classList.add('log-screen--shake');
    });
    loggedOut.addEventListener('animationend', function() {
      console.log('slide out end');
      var loggedOutActive = loggedOut.classList.contains('log-screen--out');
      var shakeActive = loggedOut.classList.contains('log-screen--shake');

      if (loggedOutActive) {
        loggedOut.classList.add('log-screen--disabled');
        loggedOut.classList.remove('log-screen--out');
      }
      if (!loggedOutActive) {
        loggedOut.classList.add('log-screen--active');
        loggedOut.classList.remove('log-screen--in');
      }
      if (shakeActive) {
        loggedOut.classList.remove('log-screen--shake');
      }
    })
  },
  loadSiteData: function() {
    var self=this;

    var p = self.getJSON('/site-feed.json');
    p.then(function(data) {
      self.siteData = data;
    });
  },
  loadStopWords: function() {
    var self=this;

    var s = self.getJSON('/stopwords.json');
    s.then(function(data) {
      self.stopWords = data;
    });
  },
  firebaseInit: function() {
    var self=this;
    self.myFirebaseRef = new Firebase("https://putneysearch.firebaseio.com/");
  },
  firebaseSet: function(dataSet, child) {
    var self=this;

    var entries = self.myFirebaseRef.child(child);

    entries.set( dataSet,
    function (error) {
      if (error) {
        console.log('error');
      } else {
        console.log('saved');
      }
    });
  },
  firebaseGet: function(child) {
    var self=this;

    // Get a database reference to our posts
    var ref = self.myFirebaseRef.child(child);
    var p = new Promise (function(resolve, reject) {
      ref.on("value", function(snapshot) {
        resolve(snapshot.val())
      }, function (errorObject) {
        reject("The read failed: " + errorObject.code)
      });
    });
    return p;
  },
  getJSON: function(url) {
    var self=this;

    var p = new Promise (function(resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url);
      xmlhttp.send();
      xmlhttp.onload = function() {
        xmlhttp.readyState == 4 && xmlhttp.status == 200
        ? resolve(JSON.parse(xmlhttp.responseText))
        : reject('fail');
      };
    });
    return p;
  },
  login: function() {
    var self=this;
    var ref = self.myFirebaseRef;

    console.log('login');

    function authHandler(error, authData) {
      if (error) {
        // console.log("Login Failed!", error);
        self.handleLoginDisplay(false, error)
      } else {
        console.log("Authenticated successfully with payload:", authData);
        self.uid = authData.uid;
        self.handleLoginDisplay(true);
      }
    }
    var login = document.querySelector('#username').value;
    var pwd = document.querySelector('#password').value;

    ref.authWithPassword({
      email    : login,
      password : pwd
    }, authHandler);

    // puts me into database

    var isNewUser = false;
    ref.onAuth(function(authData) {
      if (authData && isNewUser) {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
      }
    });
    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
      }
    }

  },
  logout: function() {
    var self=this;
    var ref = self.myFirebaseRef;

    self.myFirebaseRef.unauth(function(error) {
      error
      // ? console.log('logout failed')
      ? self.handleLoginDisplay(true, error)
      : self.handleLoginDisplay(false);
    });
  },
  checkLogin: function() {
    var self=this;
    self.myFirebaseRef.onAuth(function(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        self.uid = authData.uid;
        self.handleLoginDisplay(true)
      } else {
        console.log("User is logged out");
        self.handleLoginDisplay(false)
      }
    });
  },
  handleLoginDisplay: function(loggedIn, error) {
    var self=this;

    // var loggedInScreen = document.querySelector('#loggedin-screen');
    // var loggedOutScreen = document.querySelector('#loggedout-screen');
    //
    //   if (loggedIn) {
    //     loggedOutScreen.classList.add('log-screen--disabled');
    //     loggedInScreen.classList.remove('log-screen--disabled');
    //     loggedInScreen.classList.add('log-screen--active');
    //   }
    //   else {
    //     loggedInScreen.classList.add('log-screen--disabled');
    //     loggedOutScreen.classList.remove('log-screen--disabled');
    //     loggedOutScreen.classList.add('log-screen--active');
    //   }
    //
    //   if (error) {
    //
    //     console.log('error', error);
    //     var errorMessage = document.querySelector('#error-message');
    //     errorMessage.innerHTML = error;
    //   }
  }
};