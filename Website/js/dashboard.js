(function(){
	firebase.auth().onAuthStateChanged(function(currentUser) {
	  if (currentUser) {
	    // the user is logged in, you can bootstrap functionality now
	  }
	  else{
	  	window.location = '../html/404.html';
	  }
	});
}());