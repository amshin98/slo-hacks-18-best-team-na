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
