
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
  if (gcs >= 15) return "0: No symptoms";
  if (gcs >= 13) return "1: No significant disability";
  if (gcs >= 11) return "2: Slight disability";
  if (gcs >= 9) return "3: Moderate disability; needs some help";
  if (gcs >= 6) return "4: Moderately severe; assistance needed";
  if (gcs >= 4) return "5: Severe; bedridden, needs constant care";
  return "6: Dead";
}

function handleGcsMrsInput() {
  const gcs = calculateGCS();

  if (gcs !== null && gcs >= 3 && gcs <= 15) {
    document.getElementById("gcs").value = gcs;
    document.getElementById("gcsCategory").value = categorizeGCS(gcs);
    document.getElementById("mrs").value = mapGcsToMrs(gcs);
  } else {
    document.getElementById("gcs").value = "";
    document.getElementById("gcsCategory").value = "";
    document.getElementById("mrs").value = "";
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
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    