document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('timeDilationForm');
  const resultArea = document.getElementById('resultArea');
  const clearBtn = document.getElementById('clearBtn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    let t = Number(data.get('observerTime'));
    let mSolar = Number(data.get('massOfObject'));
    let rKm = Number(data.get('radius'));

    if (t <= 0 || isNaN(t) || mSolar <= 0 || isNaN(mSolar) || rKm <= 0 || isNaN(rKm)) {
      return alert('Please enter valid positive numbers.');
    }

    const G = 6.67430e-11;
    const c = 299792458;
    const solarMass = 1.989e30;

    const r = rKm * 1000;
    const M = mSolar * solarMass;

    const schwarzschildRadius = (2 * G * M) / (c * c);
    if (r <= schwarzschildRadius) {
      return alert(`Radius too small. Minimum allowed is ${(schwarzschildRadius / 1000).toFixed(3)} km.`);
    }

    const factor = 1 - (2 * G * M) / (r * c * c);
    if (factor <= 0) {
      return alert('Invalid result (factor ≤ 0). Input may be too extreme.');
    }

    const tNear = t * Math.sqrt(factor);
    const difference = t - tNear;

    const html = `
      <div class="resultTextJS">
        <span>Mass of Object: ${mSolar} Solar masses</span> <br/>
        <span>Radius: ${rKm} km</span><br/>
        <span>Schwarzschild Radius: ${(schwarzschildRadius/1000).toFixed(6)} km</span><br/><br/>
        <span>Distant Observer Time: <strong>${t} s</strong></span><br/>
        <span>Time near Object: <strong>${tNear.toFixed(6)} s</strong></span><br/>
        <span>Time difference: <strong>${difference.toFixed(6)} s</strong></span><br/><br/>
        <span>Gravitational Time Dilation Equation:</span>
        <div id="latexEq" style="margin-top:8px;"></div>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
      </div>
    `;
    resultArea.innerHTML = html;

    katex.render("t' = t \\cdot \\sqrt{1 - \\frac{2 G M}{r c^2}}", 
                 document.getElementById('latexEq'), { throwOnError: false });
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    resultArea.innerHTML = '';
  });
    // Axios-based visitor logging
  async function logVisitor() {
    try {
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/dilation_gravity`, {});
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
