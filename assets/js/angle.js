
    const pageIdVisitorPage = "unit_angle";

    /*
    document.addEventListener("DOMContentLoaded", function() {
      axios.post(`/serversavevisitor/${pageIdVisitorPage}`, {})
        .catch(error => console.error('Error logging visit:', error.message));
    });
    */

    // Conversion logic
    function convertAngle(name, value) {
      const conversions = {
        degree: {
          degree: value,
          radian: value * (Math.PI / 180),
          gradian: value * (10 / 9),
          arcminute: value * 60,
          arcsecond: value * 3600,
          turn: value / 360
        },
        radian: {
          degree: value * (180 / Math.PI),
          radian: value,
          gradian: value * (200 / Math.PI),
          arcminute: value * (180 / Math.PI) * 60,
          arcsecond: value * (180 / Math.PI) * 3600,
          turn: value / (2 * Math.PI)
        },
        gradian: {
          degree: value * (9 / 10),
          radian: value * (Math.PI / 200),
          gradian: value,
          arcminute: value * (9 / 10) * 60,
          arcsecond: value * (9 / 10) * 3600,
          turn: value / 400
        },
        arcminute: {
          degree: value / 60,
          radian: value * (Math.PI / 10800),
          gradian: value * (3 / 200),
          arcminute: value,
          arcsecond: value * 60,
          turn: value / (60 * 360)
        },
        arcsecond: {
          degree: value / 3600,
          radian: value * (Math.PI / 648000),
          gradian: value * (1 / 2400),
          arcminute: value / 60,
          arcsecond: value,
          turn: value / (3600 * 360)
        },
        turn: {
          degree: value * 360,
          radian: value * (2 * Math.PI),
          gradian: value * 400,
          arcminute: value * 360 * 60,
          arcsecond: value * 360 * 3600,
          turn: value
        }
      };
      return conversions[name];
    }

    // Format numbers dynamically based on magnitude
    function formatNumber(value) {
      if (value === 0) return "0";
      const absValue = Math.abs(value);
      if (absValue < 1e-6 || absValue > 1e6) {
        return value.toExponential(5);
      } else if (absValue < 1) {
        return parseFloat(value.toFixed(10));
      } else {
        return parseFloat(value.toFixed(8));
      }
    }

    // Handle input changes
    function handleAngleInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= -1000000000 && v <= 1000000000) {
        const results = convertAngle(name, v);
        inputs.forEach(input => {
          input.value = results[input.name] ? formatNumber(results[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearAngleFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleAngleInput);
    });
