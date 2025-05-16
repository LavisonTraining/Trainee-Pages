// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhjkeSO42TCDdbd3ZTHcvfMFqF9LF-GNw",
  authDomain: "trainee-pages.firebaseapp.com",
  projectId: "trainee-pages",
  storageBucket: "trainee-pages.appspot.com",
  messagingSenderId: "515476183719",
  appId: "1:515476183719:web:f58a4ed6647b6df035d982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get trainee ID from URL (e.g., ?id=abc123)
const params = new URLSearchParams(window.location.search);
const traineeId = params.get("id");

async function loadTraineeData(id) {
  if (!id) {
    document.getElementById("name").textContent = "❌ No trainee ID provided in URL.";
    return;
  }

  try {
    const docRef = doc(db, "Trainees", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      document.getElementById("name").textContent = "❌ Trainee not found.";
      return;
    }

    const data = docSnap.data();
    console.log("Fetched data:", data);

    // Display fields
    document.getElementById("name").textContent = data.Name || "No Name";
    document.getElementById("photo").src = data["Photo URL"] || "https://via.placeholder.com/150";
    document.getElementById("program").textContent = data.Program || "No Program";
    document.getElementById("phone").textContent = data.Phone || "No Phone";

    if (data.StartDate && data.StartDate.toDate) {
      const startDate = data.StartDate.toDate();
      document.getElementById("start-date").textContent = startDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } else {
      document.getElementById("start-date").textContent = "No Start Date";
    }

    // Links
    const links = data.Links || {};
    document.getElementById("submit-link").href = links.Submit || "#";
    document.getElementById("track-link").href = links.Track || "#";
    document.getElementById("Attendance-link").href = links.Attendance || "#";
    document.getElementById("CBT16-link").href = links.CBT16 || "#";

  } catch (error) {
    console.error("Error loading trainee data:", error);
    document.getElementById("name").textContent = "❌ Error loading trainee data.";
  }
}

// Run it
loadTraineeData(traineeId);
