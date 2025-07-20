// assets/js/dilation-speed.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dilationForm");
  const clearBtn = document.getElementById("clearBtn");
  const resultDiv = document.getElementById("resultArea");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const spaceshipTime = Number(form.spaceshipTime.value);
    const spaceshipVelocity = Number(form.spaceshipVelocity.value);

    if (!spaceshipVelocity || spaceshipVelocity < 1) {
      alert("Spaceship velocity is not a valid number");
      return;
    }
    if (spaceshipVelocity > 299793) {
      alert("You are going faster than light. The equation breaks down after here.");
    }
    if (!spaceshipTime || spaceshipTime < 1 || spaceshipTime > 1e13) {
      alert("Invalid amount of time. Enter time in seconds. Do not use comma or dots");
      return;
    }


    const speedLight = 299792.4580;
    const part1 = Math.pow(speedLight, 2);
    const part2 = Math.pow(spaceshipVelocity, 2);
    const part3 = part2 / part1;
    const part4 = 1 - part3;
    const part5 = Math.sqrt(part4);
    const part6 = spaceshipTime / part5;
    const part7 = part6.toFixed(1);
    const side1 = spaceshipVelocity * 100;
    const side2 = (side1 / speedLight).toFixed(1);
    const side3 = part7 - spaceshipTime;
    const side4 = side3.toFixed(1);
    const velocityRatio = (spaceshipVelocity / speedLight).toFixed(20);

    const resultHTML = `
      <div class="resultTextJS">
        <span>Speed of Light: ${speedLight}</span><br/>
        <span>Velocity to speed of light ratio: <strong>${velocityRatio}</strong></span><br/><br/>
        <span>Ratio of Spaceship Velocity to Light: ${side2}%</span><br/>
        <span>Time Dilation: ${side4} seconds</span><br/>
        <span>Time passed on Spaceship: <strong>${spaceshipTime} seconds</strong></span><br/>
        <span>Time passed on Earth: <strong>${part7} seconds.</strong> (Exact number is: ${part6})</span><br/><br/>
        <span>Above calculation is also same for months, weeks, years etc. For example, instead of seconds, you can say:</span><br/>
        <span>Time passed on Spaceship: <strong>${spaceshipTime} years</strong></span><br/>
        <span>Time passed on Earth: <strong>${part7} years.</strong></span><br/><br/>
        <span>
          Einstein Time-Dilation Equation:<br/>
          (Te: Time passed on Earth, Ts: Time passed in Spaceship, 
          v: velocity of Spaceship, c: speed of Light):
        </span>
        <div id="formula"></div>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
      </div>
    `;

    resultDiv.innerHTML = resultHTML;

    // Render KaTeX formula
    if (window.katex) {
      katex.render("T_e = \\frac{T_s}{\\sqrt{1 - \\frac{v^2}{c^2}}}", document.getElementById("formula"), {
        throwOnError: false,
        displayMode: true,
      });
    }
  });

  clearBtn.addEventListener("click", function () {
    form.reset();
    resultDiv.innerHTML = "";
  });
  // Axios-based visitor tracking
  async function logVisitor() {
    try {
      const response = await axios.post(`https://www.eumaps.org/api/save-visitor/einstein/dilation_speed`, {});
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
