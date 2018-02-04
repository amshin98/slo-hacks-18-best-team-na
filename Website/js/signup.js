(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyD1Vdfz3VAiFbGMn8ZrSTpc44YLJhx75fQ",
		authDomain: "testproj-73158.firebaseapp.com",
		databaseURL: "https://testproj-73158.firebaseio.com",
		projectId: "testproj-73158",
		storageBucket: "testproj-73158.appspot.com",
		messagingSenderId: "604434254562"
	};
	firebase.initializeApp(config);

	//Get elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');

	btnLogin.addEventListener('click', e =>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email, pass);
		console.log('yay');
		promise.catch(e => console.log(e.message));
	});

	btnSignUp.addEventListener('click', e =>{
		const email = txtEmail.value;
		const pass = txtPassword.value;

		//Check email format
		if(!email.includes('@') || !email.includes('.') || !email.length > 2){
			document.getElementById('errorLabel').innerHTML = "Invalid email";
		}

		const auth = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

}());