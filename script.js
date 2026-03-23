const firebaseConfig = {
  apiKey: "AIzaSyAD4F_K5wzHRjX9qmmT7L9-4L-T-F089kU",
  authDomain: "dvary-teacher.firebaseapp.com",
  projectId: "dvary-teacher",
  storageBucket: "dvary-teacher.appspot.com", // Hapa nimebadilisha kidogo link ya bucket
  messagingSenderId: "777492237234",
  appId: "1:777492237234:web:a8b9a4563857d47266779e"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

function checkPassword() {
    const pass = document.getElementById('password-input').value;
    if (pass === "dvary") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('main-section').classList.remove('hidden');
    } else {
        alert('Password siyo sahihi!');
    }
}

document.getElementById('upload-btn').addEventListener('click', () => {
    const file = document.getElementById('file-input').files[0];
    if (!file) return alert('Chagua faili!');

    const progressText = document.getElementById('progress-text');
    const storageRef = storage.ref('uploads/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            progressText.innerText = "Inapakia: " + progress + "%";
        }, 
        (error) => {
            console.error(error);
            alert("Kosa: " + error.message);
        }, 
        () => {
            progressText.innerText = "Imekamilika! ✅";
            alert("Faili limefika Cloud!");
        }
    );
});
