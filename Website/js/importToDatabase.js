function importToDatabase(){
	

	var usersRef = firebase.database().ref("users");
   	usersRef.set(credentials);
	 
}