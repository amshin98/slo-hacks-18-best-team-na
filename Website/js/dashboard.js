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

	populateTrips();

}

function populateTrips(){
	/*Make a Trip for every trip in the input from database
	 *var trip = document.createElement("LI");
	 *document.getElementById("tripEntries").appendChild(trip);
	*/
	var trip = document.createElement("LI");
	trip.style.color = "#dfdce3";
	trip.style.fontWeight = "bold";
	trip.style.fontSize = "larger";
	formatTrip(trip, "uber", "12/1 1:00", 10, 1)
	document.getElementById('tripEntries').appendChild(trip);
}

function formatTrip(trip, type, dateTime, cost, dist){
	/*add information to trip (make nodes)
	 *textNode = document.createTextNode("text");
	 *var img = document.createElement("img");
	 *img.src = "file";
	 *trip.append(textNode);
	*/
	var icon = document.createElement("img");
	switch (type){
		case 'uber':
			icon.src = "../src/uber.png";
			break
		case 'car':
			icon.src = "../src/car.png";
			break
		case 'walk':
			icon.src = "../src/walk.png";
			break
		case 'bike':
			icon.src = "../src/bike.png";
			break
	}

	var dateAndTime = document.createTextNode(dateTime);
	var cst = document.createTextNode(cost);
	var dst = document.createTextNode(dist);

	trip.append(icon);
	trip.append(dateAndTime);
	trip.append(cst);
	trip.append(dst);
}