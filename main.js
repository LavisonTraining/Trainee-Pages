// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Firebase config
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
const db = getFirestore(app);

// Get trainee ID from URL (e.g., ?id=abc123)
const params = new URLSearchParams(window.location.search);
const traineeId = params.get("id");

// Load trainee data from Firestore
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

    // just for log
     const data = docSnap.data();
  console.log("Fetched data:", data);

  document.getElementById("name").textContent = data.Name || "No Name";
  document.getElementById("photo").src = data["Photo URL"] || "default-photo.png";
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

  const links = data.Links || {};
  document.getElementById("submit-link").href = links.Submit || "#";
  document.getElementById("track-link").href = links.Track || "#";

} catch (error) {
  console.error("Error loading trainee data:", error);
  document.getElementById("name").textContent = "❌ Error loading trainee data.";
}
    

    const data = docSnap.data();

    document.getElementById("name").textContent = data.name;
    document.getElementById("photo").src = data.photo;
    document.getElementById("program").textContent = data.program;
    document.getElementById("phone").textContent = data.phone;

     Convert Firestore Timestamp to readable date
    const startDate = data.startDate.toDate();
    document.getElementById("start-date").textContent = startDate.toLocaleDateString("en-GB", {
     year: "numeric", month: "long", day: "numeric"
    });

    // Set attendance links
   document.getElementById("submit-link").href = data.links?.submit || "#";
    document.getElementById("track-link").href = data.links?.track || "#";

  } catch (error) {
    console.error("Error loading trainee:", error);
    document.getElementById("name").textContent = "❌ Error loading trainee data.";
  }
 }



// Run the function
loadTraineeData(traineeId);
