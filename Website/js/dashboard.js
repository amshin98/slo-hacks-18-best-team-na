(function(){
	var config = {
		apiKey: "AIzaSyD1Vdfz3VAiFbGMn8ZrSTpc44YLJhx75fQ",
		authDomain: "testproj-73158.firebaseapp.com",
		databaseURL: "https://testproj-73158.firebaseio.com",
		projectId: "testproj-73158",
		storageBucket: "testproj-73158.appspot.com",
		messagingSenderId: "604434254562"
	};
	firebase.initializeApp(config);

	/*firebase.auth().onAuthStateChanged(function(currentUser) {
	  if (currentUser) {
	    // the user is logged in, you can bootstrap functionality now
	    init();
	  }
	  else{
	  	window.location = '../html/404.html';
	  }
	});*/
	init();
}());

function init(){

	//Make a Trip for every trip in the input from database
	/*var trip = document.createElement("LI");
	 *add information to trip (make nodes)
	 textNode = document.createTextNode("text");
	 *trip.append(textNode);
	 *document.getElementById("tripEntries").appendChild(trip);
	*/

}