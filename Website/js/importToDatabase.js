function importToDatabse(){
	// Initialize Firebase
	 src ="https://www.gstatic.com/firebasejs/4.9.1/firebase.js";
	
  //Initialize Firebase
  	var config = {
    apiKey: "AIzaSyBtdBU9_7ncyD6G96vh9dZUQugVy31zyhA",
    authDomain: "ridesharecost.firebaseapp.com",
    databaseURL: "https://ridesharecost.firebaseio.com",
    projectId: "ridesharecost",
    storageBucket: "",
    messagingSenderId: "527449354867"
  	};
  firebase.initializeApp(config);

	firebase.initializeApp(config);
	var usersRef = firebase.database().ref("users");
   	usersRef.set(credentials);
	 
}
