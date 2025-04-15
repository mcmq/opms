import { app } from "./firebase.js"
import { getFirestore, doc, addDoc, deleteDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
    generateId()

    const db = getFirestore(app)

    const doctorsRef = collection(db, "doctors")
    const doctors = document.getElementById("doctors")

    onSnapshot(doctorsRef, function(snapshot) {
        doctors.innerHTML = ""
        
        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="4">No doctors</td>
            `
            doctors.appendChild(row)
            return
        }

        snapshot.forEach(function(doc) {
            const doctor = doc.data()
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4">${doctor.id}</td>
                <td class="px-6 py-4">${doctor.name}</td>
                <td class="px-6 py-4">${doctor.specialization}</td>
                <td class="px-6 py-4">${doctor.phone}</td>
                <td class="px-6 py-4">
                    <button class="p-2 bg-red-500 rounded-lg hover:bg-red-500/80 text-white" onclick="deleteDoctor('` + doc.id + `')">Delete</button>
                </td>
            `
            doctors.appendChild(row)
        })
    })

    const doctorsForm = document.getElementById("doctors-form")
    doctorsForm.addEventListener("submit", function(event) {
        event.preventDefault()
        const id = document.getElementById("doctor-id").value
        const name = document.getElementById("doctor-name").value
        const phone = document.getElementById("phone").value
        const specialization = document.getElementById("specialization").value

        if (!id || !name || !phone || !specialization) {
            alert("Please fill all the fields")
            return
        }

        const doctor = {
            id,
            name,
            phone,
            specialization
        }
        
        addDoc(doctorsRef, doctor)
            .then(function() {
                alert("Doctor added successfully")
                doctorsForm.reset()
                generateId()
            })
            .catch(function(error) {
                alert(error.message)
            })
    })
}

function generateId() {
    document.getElementById("doctor-id").value = Math.floor(Math.random() * 90000) + 10000
}

window.deleteDoctor = function(id) {
    const db = getFirestore(app)
    const doctorsRef = collection(db, "doctors")
    deleteDoc(doc(doctorsRef, id))
        .then(function() {
            alert("Doctor deleted successfully")
        })
        .catch(function(error) {
            alert(error.message)
        })
}