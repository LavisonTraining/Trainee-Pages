const urlParams = new URLSearchParams(window.location.search);
const traineeId = urlParams.get("id");

// Placeholder for now — will connect to Firebase later
const dummyData = {
  abc123: {
    name: "John Doe",
    photoUrl: "https://via.placeholder.com/150",
    phone: "+123456789",
    program: "Cognitive Behavioral Therapy",
    startDate: "2025-04-01",
    attendanceSubmitUrl: "https://example.com/submit",
    attendanceTrackUrl: "https://example.com/track"
  }
};

const data = dummyData[traineeId];

if (data) {
  document.getElementById("photo").src = data.photoUrl;
  document.getElementById("name").textContent = data.name;
  document.getElementById("phone").textContent = data.phone;
  document.getElementById("program").textContent = data.program;
  document.getElementById("start-date").textContent = data.startDate;
  document.getElementById("submit-link").href = data.attendanceSubmitUrl;
  document.getElementById("track-link").href = data.attendanceTrackUrl;
} else {
  document.getElementById("content").innerHTML = "<p>Trainee not found.</p>";
}
