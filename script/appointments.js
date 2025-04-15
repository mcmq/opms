import { app } from "./firebase.js"
import { getFirestore, collection, doc, deleteDoc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"


window.onload = function() {
    const db = getFirestore(app)

    const appointmentsRef = collection(db, "appointments")
    const appointments = document.getElementById("appointments")

    onSnapshot(appointmentsRef, function(snapshot) {
        appointments.innerHTML = ""

        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="6">No appointments</td>
            `
            appointments.appendChild(row)
            return
        }
        
        snapshot.forEach(function(doc) {
            const appointment = doc.data()
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4">${appointment.patientId}</td>
                <td class="px-6 py-4">${appointment.date}</td>
                <td class="px-6 py-4">${appointment.reason ?? "N/A"}</td>
                <td class="px-6 py-4">$${appointment.fee}</td>
                <td class="px-6 py-4">${appointment.paid ? "Paid" : "Not paid"}</td>
                <td class="px-6 py-4">
                    <button class="p-2 bg-red-500 rounded-lg hover:bg-red-500/80 text-white" onclick="deleteAppointment('` + doc.id + `')">Delete</button>
                </td>
            `
            appointments.appendChild(row)
        })
    })

    const patientsRef = collection(db, "patients")
    const patientId = document.getElementById("patient-id")

    onSnapshot(patientsRef, function(snapshot) {
        if (snapshot.empty)
            return

        snapshot.forEach(function(doc) {
            patientId.innerHTML = ""
            const patient = doc.data()
            patientId.innerHTML = `
                <option value="">Select a patient</option>
                <option name="patient-id" value="${patient.id}">${patient.id} - ${patient.name}</option>
            `
        })
    })
    
    const doctorsRef = collection(db, "doctors")
    const doctorId = document.getElementById("doctor-id")

    onSnapshot(doctorsRef, function(snapshot) {
        if (snapshot.empty)
            return

        snapshot.forEach(function(doc) {
            doctorId.innerHTML = ""
            const doctor = doc.data()
            doctorId.innerHTML = `
                <option value="">Select a doctor</option>
                <option name="doctor-id" value="${doctor.id}">${doctor.id} - ${doctor.name}</option>
            `
        })
    })

    const appointmentsForm = document.getElementById("appointments-form")
    appointmentsForm.addEventListener("submit", function(event) {
        event.preventDefault()
        const patientId = document.getElementById("patient-id").value
        const doctorId = document.getElementById("doctor-id").value
        const date = document.getElementById("date").value
        const time = document.getElementById("time").value
        const fee = document.getElementById("fee").value
        const reason = document.getElementById("reason").value

        if (!patientId || !doctorId || !date || !time || !fee) {
            alert("Please fill all the fields")
            return
        }

        const appointment = {
            patientId,
            doctorId,
            reason,
            date,
            time,
            fee,
            paid: false
        }
        const appointmentsRef = collection(db, "appointments")
        addDoc(appointmentsRef, appointment)
            .then(function() {
                alert("Appointment added successfully")
            })
            .catch(function(error) {
                alert(error.message)
            })
    })
}

window.deleteAppointment = function(id) {
    const db = getFirestore(app)
    const appointmentsRef = collection(db, "appointments")
    deleteDoc(doc(appointmentsRef, id))
        .then(function() {
            alert("Appointment deleted successfully")
        })
        .catch(function(error) {
            alert(error.message)
        })
}