import { app } from "./firebase.js"
import { collection, addDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
  const firestore = getFirestore(app)

  // Get data
  const patientsTable = document.getElementById("patients-table")

  const data = 








  const registerPatientButton = document.getElementById("register-patient")

  registerPatientButton.addEventListener("click", function() {
    const name = document.getElementById("name").value
    const dob = document.getElementById("dob").value
    const contact = document.getElementById("contact").value

    if (!name || !dob || !contact) {
      alert("Please fill all the fields.")
    } else {
      const id = Math.floor(Math.random() * 90000) + 10000
     
      addDoc(
        collection(firestore, "patients"),
        {
          id, name, dob, contact
        }
      ).then(function() {
        alert("Registering patient was success.")
      }).catch(function(error) {
        alert(error)
      })
    }
  })
}