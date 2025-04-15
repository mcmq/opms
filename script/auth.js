import { app } from "./firebase.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"

window.onload = function() {
    const auth = getAuth(app)

    const loginForm = document.getElementById("login-form")
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const errorText = document.getElementById("error")

        errorText.innerText = ""

        if (!email || !password) {
            errorText.innerText = "Please enter email and password!"
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredentials) {
            window.location.href = "/"
        })
        .catch(function(error){
            errorText.innerText = error.code
        })
    })
}

