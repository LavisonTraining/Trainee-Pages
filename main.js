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
