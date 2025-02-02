import { app } from "./firebase.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"

window.onload = function() {
    const auth = getAuth(app)

    const loginButton = document.getElementById("login-button")
    loginButton.addEventListener("click", async function() {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const errorText = document.getElementById("error")

        if (!email || !password) {
            errorText.innerText = "Please enter email and password!"
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredentials) {
            console.log(userCredentials)
        })
        .catch(function(error){
            errorText.innerText = error.code
        })
    })
}

