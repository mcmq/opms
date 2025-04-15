import { app } from "./firebase.js"
import { getFirestore, collection, doc, deleteDoc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"

window.onload = function() {
    const db = getFirestore(app)
    const auth = getAuth(app)

    const usersRef = collection(db, "users")
    const users = document.getElementById("users")

    onSnapshot(usersRef, function(snapshot) {
        users.innerHTML = ""

        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="5">No users</td>
            `
            users.appendChild(row)
            return
        }
        
        snapshot.forEach(function(doc) {
            const user = doc.data()
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4">${user.name}</td>
                <td class="px-6 py-4">${user.email}</td>
                <td class="px-6 py-4">${user.role}</td>
            `
            users.appendChild(row)
        })
    })

    const usersForm = document.getElementById("users-form")
    usersForm.addEventListener("submit", function(event) {
        event.preventDefault()

        const name = document.getElementById("user-name").value
        const email = document.getElementById("user-email").value
        const role = document.getElementById("user-role").value
        const password = document.getElementById("user-password").value

        if (!name || !email || !role || !password) {
            alert("Please fill all the fields")
            return
        }

        const user = {
           name, email, role, password
        }
        const usersRef = collection(db, "users")

        createUserWithEmailAndPassword(auth, email, password).then(function(userCredential) {
            addDoc(usersRef, user)
            .then(function() {
                alert("User added successfully")
            })
            .catch(function(error) {
                alert(error.message)
            })
        }).catch(function(error) {
            alert(error.message)
        })
    })
}

window.deleteAppointment = function(id) {
    const db = getFirestore(app)
    const usersRef = collection(db, "users")
    deleteDoc(doc(usersRef, id))
        .then(function() {
            alert("Appointment deleted successfully")
        })
        .catch(function(error) {
            alert(error.message)
        })
}