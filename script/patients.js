import { app } from "./firebase.js"
import { collection, addDoc, doc, onSnapshot, getFirestore, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
    generateId()

    const db = getFirestore(app)

    const patientsRef = collection(db, "patients")
    const patients = document.getElementById("patients")

    onSnapshot(patientsRef, function(snapshot) {
        patients.innerHTML = ""
        
        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="5">No patients</td>
            `
            patients.appendChild(row)
            return
        }

        snapshot.forEach(function(doc) {
            const patient = doc.data()
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4">${patient.id}</td>
                <td class="px-6 py-4">${patient.name}</td>
                <td class="px-6 py-4">${patient.dob}</td>
                <td class="px-6 py-4">${patient.phone}</td>
                <td class="px-6 py-4">
                    <button class="p-2 bg-red-500 rounded-lg hover:bg-red-500/80 text-white" onclick="deletePatient('` + doc.id + `')">Delete</button>
                </td>
            `
            patients.appendChild(row)
        })
    })

    const patientsForm = document.getElementById("patients-form")
    patientsForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const id = document.getElementById("patient-id").value
        const name = document.getElementById("patient-name").value
        const dob = document.getElementById("dob").value
        const phone = document.getElementById("phone").value

        if (!id || !name || !phone || !dob) {
            alert("Please fill all the fields")
            return
        }

        const patient = {
            id,
            name,
            phone,
            phone
        }

        addDoc(patientsRef, patient)
            .then(function() {
                alert("Patient registered successfully")
                patientsForm.reset()
                generateId()
            })
            .catch(function(error) {
                alert(error.message)
            })
    })
}

function generateId() {
    document.getElementById("patient-id").value = Math.floor(Math.random() * 90000) + 10000
}

window.deletePatient = function(id) {
    const db = getFirestore(app)
    const patientsRef = collection(db, "patients")
    const patientRef = doc(patientsRef, id)
    deleteDoc(patientRef)
        .then(function() {
            alert("Patient deleted successfully")
        })
        .catch(function(error) {
            alert(error.message)
        })
}