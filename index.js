    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyA6S4DDMkVkZEjvPvvCrYvguN_5WGN3DjQ",
        authDomain: "navigatenomad-de2d2.firebaseapp.com",
        projectId: "navigatenomad-de2d2",
        storageBucket: "navigatenomad-de2d2.appspot.com",
        messagingSenderId: "712855534419",
        appId: "1:712855534419:web:ead0a759d50111fb30bfa6"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      const auth = firebase.auth();
      const database = firebase.database();

      //setting up sign up function
      function signup() {

        
            firstname = document.getElementById('firstname').value
            lastname = sdocument.getElementById('lastname').value
            email = document.getElementById('email').value
            password = document.getElementById('password').value
            confirmpassword = document.getElementById('confirmpassword').value
        
           
        auth.createUserWithEmailAndPassword(email, password)
            .then(function(){
                // User created successfully
                var user = auth.currentUser
                
                var database_ref = database.ref()

                var user_data = {
                    firstname  :  firstname,
                    lastname:lastname,
                    email:email,
                    password:password,
                    confirmpassword:confirmpassword
                }
                database_ref.child('users/' + user.uid).set(user_data)
                alert('User created!')
    
                // Optionally, update user profile with additional information (e.g., name)
                // user.updateProfile({ displayName: name });
    
                //window.location.href = "Login.html"; // Replace with your login page URL
                // Handle successful signup (e.g., redirect to login page)
            })
            .catch(function(error){
                // Handle signup errors
                var errorCode = error.code
                var errorMessage = error.message
                alert(errorMessage)
            })
    }
    


//setting up login function
/*
function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User logged in successfully
            const user = userCredential.user;
            console.log("Logged in user:", user);
            // Handle successful login (e.g., redirect to protected content)
        })
        .catch((error) => {
            // Handle login errors (e.g., display error messages)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
}


    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;

        login(email, password);
    });
*/