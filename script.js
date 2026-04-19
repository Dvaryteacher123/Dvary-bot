// 1. Your Firebase Configuration (From your photo)
const firebaseConfig = {
  apiKey: "AIzaSyDR849EK1RofT-1Re5th7BM5M4SEl9kXOE",
  authDomain: "hospitallink-c2bf5.firebaseapp.com",
  projectId: "hospitallink-c2bf5",
  storageBucket: "hospitallink-c2bf5.firebasestorage.app",
  messagingSenderId: "606259613120",
  appId: "1:606259613120:web:08812a74e04a397f9b8c25",
  measurementId: "G-ZRGPVMZWDC"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Function to SEND Result
async function sendResult() {
    const pId = document.getElementById('patientId').value;
    const doctor = document.getElementById('receiverDoctor').value;
    const remarks = document.getElementById('findings').value;

    if (!pId || !doctor || !remarks) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        await db.collection("medical_results").add({
            patientId: pId,
            receiverId: doctor,
            findings: remarks,
            status: "unread",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Success! Result sent to " + doctor);
        document.getElementById('patientId').value = '';
        document.getElementById('findings').value = '';
    } catch (error) {
        console.error("Error: ", error);
        alert("Make sure you enabled 'Firestore Database' in Test Mode!");
    }
}

// 4. Function to LOAD Results (Live)
function loadResults() {
    db.collection("medical_results")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
          const log = document.getElementById('activityLog');
          log.innerHTML = ""; 
          snapshot.forEach((doc) => {
              const data = doc.data();
              const item = document.createElement('div');
              item.className = 'log-item';
              item.innerHTML = `
                  <strong>Patient ID: ${data.patientId}</strong><br>
                  To: ${data.receiverId}<br>
                  Findings: ${data.findings}
              `;
              log.appendChild(item);
          });
      });
}

// Start loading results immediately
loadResults();
