

    const pageIdVisitorPage = "frequency";

    
  document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    
    // Conversion logic
    function convertFrequency(name, value) {
      const conversions = {
        hertz: {
          hertz: value,
          kilohertz: value / 1e3,
          megahertz: value / 1e6,
          gigahertz: value / 1e9,
          rpm: value * 60,
          cyclesPerSecond: value
        },
        kilohertz: {
          hertz: value * 1e3,
          kilohertz: value,
          megahertz: value / 1e3,
          gigahertz: value / 1e6,
          rpm: value * 60000,
          cyclesPerSecond: value * 1e3
        },
        megahertz: {
          hertz: value * 1e6,
          kilohertz: value * 1e3,
          megahertz: value,
          gigahertz: value / 1e3,
          rpm: value * 6e7,
          cyclesPerSecond: value * 1e6
        },
        gigahertz: {
          hertz: value * 1e9,
          kilohertz: value * 1e6,
          megahertz: value * 1e3,
          gigahertz: value,
          rpm: value * 6e10,
          cyclesPerSecond: value * 1e9
        },
        rpm: {
          hertz: value / 60,
          kilohertz: value / 60000,
          megahertz: value / 6e7,
          gigahertz: value / 6e10,
          rpm: value,
          cyclesPerSecond: value / 60
        },
        cyclesPerSecond: {
          hertz: value,
          kilohertz: value / 1e3,
          megahertz: value / 1e6,
          gigahertz: value / 1e9,
          rpm: value * 60,
          cyclesPerSecond: value
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
    function handleFrequencyInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= 0 && v <= 1000000000) {
        const results = convertFrequency(name, v);
        inputs.forEach(input => {
          input.value = results[input.name] ? formatNumber(results[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearFrequencyFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleFrequencyInput);
    });