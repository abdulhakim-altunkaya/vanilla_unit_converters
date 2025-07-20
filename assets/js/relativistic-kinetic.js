document.addEventListener('DOMContentLoaded', function () {
  const resultArea = document.getElementById('resultArea');
  const form = document.querySelector('.formInvestment');
  const clearButton = document.getElementById('clearButton');

  const JOULES_TO_KWH = 2.77778e-7;
  const JOULES_TO_EV = 6.242e+18;
  const JOULES_TO_CAL = 0.239006;
  const JOULES_TO_MEGATONS_TNT = 2.39e-16;
  const JOULES_TO_KG_TNT = 2.39e-4;
  const JOULES_TO_HIROSHIMA = 6.3e+13;
  const JOULES_TO_TSAR_BOMB = 2.1e+17;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const m0 = parseFloat(form.restMass.value) / 1000; // grams to kg
    const vKm = parseFloat(form.velocity.value);
    const v = vKm * 1000; // km/s to m/s
    const c = 299792458;

    if (!m0 || m0 <= 0) {
      alert('Rest mass is not valid.');
      return;
    }

    if (!vKm || vKm <= 0) {
      alert('Velocity is not valid. ');
      return;
    }

    if (v >= c) {
      alert('Velocity must be less than the speed of light (299792.458 km/s). Kinetic energy becomes infinite as you approach light speed.');
      return;
    }

    const gamma = 1 / Math.sqrt(1 - Math.pow(v / c, 2));
    const kineticJoules = (gamma - 1) * m0 * c * c;
    const velocityRatio = (v / c).toFixed(20);

    const energy = {
      joules: kineticJoules.toFixed(2),
      kWh: (kineticJoules * JOULES_TO_KWH).toFixed(2),
      eV: (kineticJoules * JOULES_TO_EV).toExponential(2),
      calories: (kineticJoules * JOULES_TO_CAL).toFixed(2),
      kgTNT: (kineticJoules * JOULES_TO_KG_TNT).toFixed(2),
      megatonsTNT: (kineticJoules * JOULES_TO_MEGATONS_TNT).toFixed(2),
      hiroshimaBombs: (kineticJoules / JOULES_TO_HIROSHIMA).toFixed(4),
      tsarBombs: (kineticJoules / JOULES_TO_TSAR_BOMB).toFixed(6),
    };

    resultArea.innerHTML = `
      <div class="resultTextJS">
        <span>Rest Mass: ${(m0 * 1000).toFixed(2)} grams</span><br><br>
        <span>Velocity: ${vKm} km/s</span><br>
        <span>Speed of light: 299,792.4580 km/s</span><br>
        <span>Velocity to speed of light ratio: <strong>${velocityRatio}</strong></span><br><br>
        <p><strong>Energy in Joules:</strong> ${energy.joules} J</p>
        <p><strong>Energy in Kilowatt-hours:</strong> ${energy.kWh} kWh</p>
        <p><strong>Energy in Electronvolts:</strong> ${energy.eV} eV</p>
        <p><strong>Energy in Calories:</strong> ${energy.calories} cal</p>
        <p><strong>Equivalent in Megatons of TNT:</strong> ${energy.megatonsTNT} MT</p>
        <p><strong>Equivalent in Kilograms of TNT:</strong> ${energy.kgTNT} kg</p>
        <p><strong>Equivalent in Hiroshima Atomic Bombs:</strong> ${energy.hiroshimaBombs} bombs</p>
        <p><strong>Equivalent in Tsar Hydrogen Bombs:</strong> ${energy.tsarBombs} bombs</p><br>

        <p><strong>Relativistic Kinetic Energy Equation
        (KE: kinetic energy, m: rest mass in grams, y: Lorentz factor, c: speed of light km/s):</strong></p>
        <div> $$ KE = (γ - 1) mc² $$</div>
        <br/>
        <p class="resultTextJSparagraphs">In relativity, the total energy (TE) of an object is given by equation below. 
          For an object at rest, Lorentz factor is 1.
          For an object moving at relativistic speeds, Lorentz factor grows very large.</p>
        <div>$$ TE = γmc² $$</div>
        <br/>
        <p class="resultTextJSparagraphs">This total energy includes both the rest energy and the energy due to motion (kinetic energy). 
          To isolate the kinetic energy, we subtract the rest energy from the total energy:</p>
        <div> $$ KE = γmc² - mc² = (γ - 1)mc² $$</div>
        <br/>
        <p class="resultTextJSparagraphs">
          If an object moving at relativistic speeds hits the Earth, approximately 90% of its kinetic energy will
          convert into an explosion (heat, shockwaves, seismic waves, etc). Atmospheric drag for objects moving at 
          relativistic speed is negligible. During these type of impacts, rest enegy of the object is not converted into
          explosion, only its kinetic energy is converted to explosion (90%). For impact scenarios where kinetic energy 
          and rest energy together convert into explosion, the impact should be accompanied by a type of nuclear detonation or 
          matter-antimatter annihilation.
        </p>


        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    `;
    renderMathInElement(resultArea);
  });

  clearButton.addEventListener('click', function () {
    form.reset();
    resultArea.textContent = '';
  });

  // Initial value
  resultArea.textContent = 'Speed of light: 299,792.4580 km/s';
    // Axios-based visitor tracking
  async function logVisitor() {
    try {
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/relativistic_kinetic`, {});
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
