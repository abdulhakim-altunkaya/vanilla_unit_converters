// assets/js/relativistic-mass.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("relMassForm");
  const resultDiv = document.getElementById("resultArea");
  const clearBtn = document.getElementById("clearBtn");

  const c = 299792458; // speed of light in m/s

  const GRAMS_TO_KG = 1e-3;
  const GRAMS_TO_TON = 1e-6;
  const GRAMS_TO_MEGATON = 1e-12;
  const GRAMS_TO_GIGATON = 1e-15;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const restMass = parseFloat(document.getElementById("restMassInput").value);
    const velocityKm = parseFloat(document.getElementById("velocityInput").value);
    const velocity = velocityKm * 1000;

    if (!restMass || restMass <= 0) {
      alert("Rest mass is not valid.");
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

    const gamma = 1 / Math.sqrt(1 - (velocity * velocity) / (c * c));
    const relativisticMass = gamma * restMass;

    const velocityRatio = (velocity / c).toFixed(20);

    const resultHTML = `
      <div class="resultTextJS">
        <span>Rest Mass: ${restMass} grams</span><br/><br/>
        <span>Velocity: ${velocityKm} km/s</span><br/>
        <span>Speed of light: 299,792.4580 km/s</span><br/>
        <span>Velocity to speed of light ratio: <strong>${velocityRatio}</strong></span><br/><br/>
        <p><strong>Relativistic Mass in Grams:</strong> ${relativisticMass.toFixed(2)} g</p>
        <p><strong>Relativistic Mass in Kilos:</strong> ${(relativisticMass * GRAMS_TO_KG).toFixed(2)} kg</p>
        <p><strong>Relativistic Mass in Tons:</strong> ${(relativisticMass * GRAMS_TO_TON).toFixed(4)} tons</p>
        <p><strong>Relativistic Mass in Megatons:</strong> ${(relativisticMass * GRAMS_TO_MEGATON).toFixed(6)} megatons</p>
        <p><strong>Relativistic Mass in Gigatons:</strong> ${(relativisticMass * GRAMS_TO_GIGATON).toFixed(8)} gigatons</p><br/>
        <span>Relativistic Mass Equation:</span><br/> <br/>
        <em>$$ m(v) = m₀ / √(1 - v² / c²) $$</em>

          <p class="resultTextJSparagraphs">As an object approaches the speed of light, its relativistic mass (in other words ineartial mass 
          at relativistic speeds) increases significantly. As an object moves faster, it gains more kinetic energy. 
          In relativity, this extra energy contributes to the object's inertia, which is interpreted as an increase 
          in its relativistic mass. The closer an object gets to the speed of light, the more energy is required 
          to keep accelerating it, because the relativistic mass increases dramatically.</p>
          <p class="resultTextJSparagraphs">However, keep in mind that the relations between gravitational waves, inertial mass, rest mass 
          and gravitational mass at relativistic speeds are not fully explored. And Einstein later distanced 
          himself from "relativistic mass" concept and said "energy increases" (Relativistic Kinetic Energy 
          Calculator). So, when it is said "mass increases" do not directly understand it as its size or 
          weight increases. This area is still open to your ideas.</p>

        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
      </div>
    `;

    resultDiv.innerHTML = resultHTML;

    // Trigger KaTeX rendering on the new content:
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
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/relativistic_mass`, {});
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
