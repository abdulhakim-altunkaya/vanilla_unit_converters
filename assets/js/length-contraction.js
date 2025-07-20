// assets/js/length-contraction.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lengthContractionForm");
  const resultDiv = document.getElementById("resultArea");
  const clearBtn = document.getElementById("clearBtn");

  const c = 299792458; // Speed of light in m/s

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const restLength = parseFloat(document.getElementById("restLengthInput").value);
    const velocityKm = parseFloat(document.getElementById("velocityInput").value);
    const velocity = velocityKm * 1000; // Convert to m/s

    if (!restLength || restLength <= 0) {
      alert("Rest length is not valid.");
      return;
    }

    if (!velocityKm || velocityKm <= 0) {
      alert("Velocity is not valid.");
      return;
    }

    if (velocity >= c) {
      alert("Velocity must be less than the speed of light (299,792.458 km/s).");
      return;
    }

    const velocityRatio = (velocity / c).toFixed(20);
    const factor = Math.sqrt(1 - Math.pow(velocity / c, 2));

    if (factor <= 0 || isNaN(factor)) {
      alert("The result is invalid due to extreme velocity.");
      return;
    }

    const contractedLength = restLength * factor;

    resultDiv.innerHTML = `
      <div class="resultTextJS">
        <span>Rest Length: ${restLength} meters</span><br/>
        <span>Speed of light: 299,792.4580 km/s</span><br/>
        <span>Velocity to speed of light ratio: <strong>${velocityRatio}</strong></span><br/><br/>
        <span>Observed Length: <strong>${contractedLength.toFixed(6)} meters</strong></span><br/><br/>
        <span>
          Relativistic Length Contraction Equation:<br/><br/>
          $$ L = L_0 \\times \\sqrt{1 - \\frac{v^2}{c^2}} $$
        </span>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
      </div>
    `;

    // Render KaTeX for the new content
    renderMathInElement(resultDiv, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
    });
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
    resultDiv.innerHTML = "Speed of light: 299,792.4580 km/s";
  });

  // Axios-based visitor tracking
  async function logVisitor() {
    try {
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/length_contraction`, {});
      console.log("Visitor log response:", response.data);
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn("Visitor already logged recently; skipping.");
      } else {
        console.error("Visitor log error:", error.message);
      }
    }
  }

  logVisitor();
});
