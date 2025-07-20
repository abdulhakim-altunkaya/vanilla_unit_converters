// assets/js/mass-energy.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("massEnergyForm");
  const clearBtn = document.getElementById("clearBtn");
  const resultDiv = document.getElementById("resultArea");
  const massInput = document.getElementById("massInput");

  const speedOfLight = 3 * Math.pow(10, 8); // m/s
  const energyPerMegatonTNT = 4.18 * Math.pow(10, 15);
  const energyPerKgTNT = 4.184 * Math.pow(10, 6);
  const energyPerHiroshimaBomb = 6.276 * Math.pow(10, 13);
  const energyPerTsarBomb = 2.09 * Math.pow(10, 17);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const grams = parseFloat(massInput.value);
    if (!grams || grams <= 0) {
      alert("Please enter a valid mass in grams.");
      return;
    }

    resultDiv.innerHTML = ""; // Clear previous result

    const massKg = grams / 1000;
    const energyJoules = massKg * Math.pow(speedOfLight, 2);
    const energyKWh = energyJoules / 3.6e6;
    const energyEv = energyJoules / 1.60218e-19;
    const energyCalories = energyJoules / 4.184;
    const megatonsTNT = energyJoules / energyPerMegatonTNT;
    const kgTNT = energyJoules / energyPerKgTNT;
    const hiroshimaBombs = energyJoules / energyPerHiroshimaBomb;
    const tsarBombs = energyJoules / energyPerTsarBomb;

    resultDiv.innerHTML = `
      <div class="resultTextJS">
        <div style="margin: 10px 0; font-size: 1.2em;">
          $$ E_{\\text{joules}} = m_{\\text{kg}} \\times (3 \\times 10^8)^2 $$
        </div>
        <p><strong>Energy in Joules:</strong> ${energyJoules.toFixed(2)} J</p>
        <p><strong>Energy in Kilowatt-hours:</strong> ${energyKWh.toFixed(8)} kWh</p>
        <p><strong>Energy in Electronvolts:</strong> ${energyEv.toExponential(3)} eV</p>
        <p><strong>Energy in Calories:</strong> ${energyCalories.toFixed(2)} cal</p>
        <p><strong>Equivalent in Megatons of TNT:</strong> ${megatonsTNT.toFixed(5)}</p>
        <p><strong>Equivalent in Kilograms of TNT:</strong> ${kgTNT.toFixed(2)}</p>
        <p><strong>Equivalent in Hiroshima Atomic Bombs:</strong> ${hiroshimaBombs.toFixed(5)}</p>
        <p><strong>Equivalent in Tsar Hydrogen Bombs:</strong> ${tsarBombs.toFixed(5)}</p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    `;

    // Render KaTeX on the newly inserted content
    renderMathInElement(resultDiv, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
    });
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
    resultDiv.innerHTML = "Energy results will appear here...";
  });
  
  // Axios-based visitor tracking
  async function logVisitor() {
    try {
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/mass_energy`, {});
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
