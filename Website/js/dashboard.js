(function(){
	var config = {
    apiKey: "AIzaSyBtdBU9_7ncyD6G96vh9dZUQugVy31zyhA",
    authDomain: "ridesharecost.firebaseapp.com",
    databaseURL: "https://ridesharecost.firebaseio.com",
    projectId: "ridesharecost",
    storageBucket: "",
    messagingSenderId: "527449354867"
  };
  firebase.initializeApp(config);


	firebase.auth().onAuthStateChanged(function(currentUser) {
	  if (currentUser) {
	    // the user is logged in, you can bootstrap functionality now
	    init();
	  }
	  else{
	  	window.location = '../html/404.html';
	  }
	});
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
	var trip1 = document.createElement("LI");
	var trip2 = document.createElement("LI");
	var trip3 = document.createElement("LI");
	var trip4 = document.createElement("LI");
	trip1.style.color = "#dfdce3";
	trip1.style.fontWeight = "bold";
	trip1.style.fontSize = "xx-large";
	trip2.style.color = "#dfdce3";
	trip2.style.fontWeight = "bold";
	trip2.style.fontSize = "xx-large";
	trip3.style.color = "#dfdce3";
	trip3.style.fontWeight = "bold";
	trip3.style.fontSize = "xx-large";
	trip4.style.color = "#dfdce3";
	trip4.style.fontWeight = "bold";
	trip4.style.fontSize = "xx-large";
	formatTrip(trip1, "uber", "1/12/18 3:20 PM", 13.12, 3.83)
	document.getElementById('tripEntries').appendChild(trip1);
	formatTrip(trip2, "uber", "1/12/18 8:11 AM", 12.21, 3.89)
	document.getElementById('tripEntries').appendChild(trip2);
	formatTrip(trip3, "uber", "12/8/17 1:15 PM", 3.29, 1.12)
	document.getElementById('tripEntries').appendChild(trip3);
	formatTrip(trip4, "uber", "12/8/17 8:48 AM", 4.25, 0.71)
	document.getElementById('tripEntries').appendChild(trip4);
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

	var dateAndTime = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0".concat(dateTime));
	var cst = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0$".concat(cost));
	var dst = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0".concat(dist).concat(" miles"));

	trip.append(icon);
	trip.append(dateAndTime);
	trip.append(cst);
	trip.append(dst);
}