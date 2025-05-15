<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAhjkeSO42TCDdbd3ZTHcvfMFqF9LF-GNw",
    authDomain: "trainee-pages.firebaseapp.com",
    projectId: "trainee-pages",
    storageBucket: "trainee-pages.firebasestorage.app",
    messagingSenderId: "515476183719",
    appId: "1:515476183719:web:f58a4ed6647b6df035d982"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
// Get trainee ID from URL
const params = new URLSearchParams(window.location.search);
const traineeId = params.get("id");

if (!traineeId) {
  alert("No trainee ID found in URL.");
} else {
  const docRef = db.collection("trainees").doc(traineeId);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();

      // Fill in the page with trainee data
      document.getElementById("name").textContent = data.name;
      document.getElementById("photo").src = data.photo;
      document.getElementById("program").textContent = data.program;
      document.getElementById("phone").textContent = data.phone;

      // Convert timestamp to readable date
      const startDate = data.startDate.toDate();
      document.getElementById("start-date").textContent = startDate.toLocaleDateString("en-GB", {
        year: "numeric", month: "long", day: "numeric"
      });

      // Load links
      document.getElementById("submit-link").href = data.links.submit;
      document.getElementById("track-link").href = data.links.track;

    } else {
      alert("No trainee found with this ID.");
    }
  }).catch((error) => {
    console.error("Error getting document:", error);
  });
}
