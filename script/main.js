import { app } from "./firebase.js"
import { getCountFromServer, getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
    const db = getFirestore(app)

    const totalPatients = document.getElementById("total-patients")
    const totalDoctors = document.getElementById("total-doctors")
    const totalAppointments = document.getElementById("total-appointments")   

    const patientsRef = collection(db, "patients")
    const doctorsRef = collection(db, "doctors")
    const appointmentsRef = collection(db, "appointments")

    getCountFromServer(patientsRef)
    .then(function(snapshot) {
        totalPatients.innerText = snapshot.data().count
    })

    getCountFromServer(doctorsRef)
    .then(function(snapshot) {
        totalDoctors.innerText = snapshot.data().count
    })

    getCountFromServer(appointmentsRef)
    .then(function(snapshot) {
        totalAppointments.innerText = snapshot.data().count
    })  

    const upcomingAppointments = document.getElementById("upcoming-appointments")

    onSnapshot(appointmentsRef, function(snapshot) {
        upcomingAppointments.innerHTML = ""
        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="4">No upcoming appointments</td>
            `
            upcomingAppointments.appendChild(row)
            return
        }

        snapshot.forEach(function(doc) {
            const appointment = doc.data()
            const appointmentDate = new Date(appointment.date)
            const currentDate = new Date()
            if (appointmentDate > currentDate) {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td class="px-6 py-4">${appointment.patientId}</td>
                    <td class="px-6 py-4">${appointment.date}</td>
                    <td class="px-6 py-4">${appointment.reason}</td>
                `
                upcomingAppointments.appendChild(row)
            }
        })
    })
}
