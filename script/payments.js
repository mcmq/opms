import { app } from "./firebase.js"
import { getFirestore, collection, doc, updateDoc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
    const db = getFirestore(app)

    const paymentsRef = collection(db, "appointments")
    const payments = document.getElementById("payments")
   
    onSnapshot(paymentsRef, function(snapshot) {
        payments.innerHTML = ""

        if (snapshot.empty) {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4 text-center" colspan="5">No payments</td>
            `
            payments.appendChild(row)
            return
        }

        snapshot.forEach(function(doc) {
            const payment = doc.data()
            const row = document.createElement("tr")
            row.innerHTML = `
                <td class="px-6 py-4">${payment.patientId}</td>
                <td class="px-6 py-4">${payment.date}</td>
                <td class="px-6 py-4">$${payment.fee}</td>
                <td class="px-6 py-4">${payment.paid ? "Paid" : "Not paid"}</td>
                <td class="px-6 py-4">
                    <button class="p-2 bg-green-400 rounded-lg hover:bg-green-400/80 disabled:bg-gray-400 text-white" onclick="makePayment('` + doc.id + `')" ${payment.paid ? "disabled" : ""}>Pay</button>
                </td>
            `
            payments.appendChild(row)
        })
    })
}

window.makePayment = function(id) {
    console.log(id)
    const db = getFirestore(app)
    const appointmentsRef = collection(db, "appointments")
    updateDoc(doc(appointmentsRef, id), {paid: true})
        .then(function() {
            alert("Payment made successfully")
        })
        .catch(function(error) {
            alert(error.message)
        })
}