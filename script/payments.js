import { app } from "./firebase.js"
import { getFirestore, collection, doc, deleteDoc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

window.onload = function() {
    const db = getFirestore(app)

    const paymentsRef = collection(db, "payments")
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
                <td class="px-6 py-4">${doc.id}</td>
                <td class="px-6 py-4">${payment.date}</td>
                <td class="px-6 py-4">${payment.amount}</td>
                <td class="px-6 py-4">
                    <button class="p-2 bg-red-500 hover:bg-red-500/80 text-white" onclick="deletePayment('` + doc.id + `')">Delete</button>
                </td>
            `
            payments.appendChild(row)
        })
    })
}