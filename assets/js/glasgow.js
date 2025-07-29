// Validate Eye Input (1-4)
function validateEye() {
  const eyeInput = document.getElementById("eye");
  let value = parseInt(eyeInput.value);
  
  if (isNaN(value)) {
    alert("Enter 1-4 for eye response");
    document.getElementById("eye").value ="";
  } 
  if (value < 1 || value > 4) {
    alert("Enter 1-4 for eye response");
    document.getElementById("eye").value ="";
  } 
}

// Validate Verbal Input (1-5)
function validateVerbal() {
  const verbalInput = document.getElementById("verbal");
  let value = parseInt(verbalInput.value);
  
  if (isNaN(value)) {
    alert("Enter 1-5 for verbal response");
    document.getElementById("verbal").value ="";
  } 
  if (value < 1 || value > 5) {
    alert("Enter 1-5 for verbal response");
    document.getElementById("verbal").value ="";
  } 
}

// Validate Motor Input (1-6)
function validateMotor() {
  const motorInput = document.getElementById("motor");
  let value = parseInt(motorInput.value);
  
  if (isNaN(value)) {
    alert("Enter 1-6 for motor response");
    document.getElementById("motor").value ="";
  } 
  if (value < 1 || value > 6) {
    alert("Enter 1-6 for motor response");
    document.getElementById("motor").value ="";
  } 
}

// Add event listeners
document.getElementById("eye").addEventListener("input", validateEye);
document.getElementById("verbal").addEventListener("input", validateVerbal);
document.getElementById("motor").addEventListener("input", validateMotor);

function calculateGCS() {
  const eye = parseInt(document.getElementById("eye").value) || 0;
  const verbal = parseInt(document.getElementById("verbal").value) || 0;
  const motor = parseInt(document.getElementById("motor").value) || 0;

  const total = eye + verbal + motor;

  if (eye && verbal && motor) return total;
    return null;
  }

  function categorizeGCS(gcs) {
    if (gcs <= 8) return "Severe (3–8)";
    if (gcs <= 12) return "Moderate (9–12)";
    return "Mild (13–15)";
  }

function mapGcsToMrs(gcs) {
  if (gcs >= 15) return "No symptoms (0)";
  if (gcs >= 13) return "No significant disability (1)";
  if (gcs >= 11) return "Slight disability (2)";
  if (gcs >= 9) return "Moderate disability; needs some help (3)";
  if (gcs >= 6) return "Moderately severe; assistance needed (4)";
  if (gcs >= 4) return "Severe; bedridden, needs constant care (5)";
  return "Dead (6)";
}

function handleGcsMrsInput() {
  const gcs = calculateGCS();

  if (gcs !== null && gcs >= 3 && gcs <= 15) {
    document.getElementById("gcs").value = gcs;
    document.getElementById("gcsCategory").innerHTML = categorizeGCS(gcs);
    document.getElementById("mrs").innerHTML = mapGcsToMrs(gcs);
  } else {
    document.getElementById("gcs").value = "";
    document.getElementById("gcsCategory").innerHTML = "";
    document.getElementById("mrs").innerHTML = "";
  }
}

function clearGcsMrsFields() {
  document.querySelectorAll(".inputFields").forEach(input => {
    input.value = "";
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".inputFields:not([readonly])").forEach(input => {
    input.addEventListener("input", handleGcsMrsInput);
  });
});

    const pageIdVisitorPage = "coma";

    
  document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`https://www.eumaps.org/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    