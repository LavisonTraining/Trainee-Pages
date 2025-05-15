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
const urlParams = new URLSearchParams(window.location.search);
const traineeId = urlParams.get("id");
const startDate = new Date("2025-04-01"); // ISO format
const formattedStartDate = startDate.toLocaleDateString("en-GB", {
  year: "numeric", month: "long", day: "numeric"
});

// Dummy data for now
const dummyData = {
  abc123: {
    name: "John Doe",
    photoUrl: "https://via.placeholder.com/150",
    phone: "+123456789",
    program: "Dialectic Behavioral Therapy",
    startDate: formattedStartDate,
   links: {
  submit: "https://example.com/submit",
  track: "https://example.com/track"
}
  }
};

const data = dummyData[traineeId];

if (data) {
  document.getElementById("photo").src = data.photoUrl;
  document.getElementById("name").textContent = data.name;
  document.getElementById("phone").textContent = data.phone;
  document.getElementById("program").textContent = data.program;
  const startDate = data.startDate.toDate(); // Convert timestamp to JavaScript Date
document.getElementById("start-date").textContent = startDate.toLocaleDateString("en-GB", {
  year: "numeric", month: "long", day: "numeric"
});
  document.getElementById("submit-link").href = data.links.submit;
document.getElementById("track-link").href = data.links.track;
} else {
  document.getElementById("content").innerHTML = "<p>Trainee not found.</p>";
}
