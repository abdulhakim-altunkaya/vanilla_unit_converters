
    const pageIdVisitorPage = "pressure";

    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`https://www.eumaps.org/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    // Conversion logic
    function convertPressure(name, value) {
      const conversions = {
        pascal: {
          pascal: value,
          kilopascal: value / 1000,
          bar: value / 100000,
          atmosphere: value / 101325,
          millibar: value / 100,
          psi: value / 6894.75729,
          torr: value / 133.322368,
          inchMercury: value / 3386.38864
        },
        kilopascal: {
          pascal: value * 1000,
          kilopascal: value,
          bar: value / 100,
          atmosphere: value / 101.325,
          millibar: value * 10,
          psi: value / 6.89475729,
          torr: value * 7.50061683,
          inchMercury: value / 3.38638864
        },
        bar: {
          pascal: value * 100000,
          kilopascal: value * 100,
          bar: value,
          atmosphere: value / 1.01325,
          millibar: value * 1000,
          psi: value * 14.5037738,
          torr: value * 750.061683,
          inchMercury: value * 29.5299831
        },
        atmosphere: {
          pascal: value * 101325,
          kilopascal: value * 101.325,
          bar: value * 1.01325,
          atmosphere: value,
          millibar: value * 1013.25,
          psi: value * 14.6959488,
          torr: value * 760,
          inchMercury: value * 29.9212598
        },
        millibar: {
          pascal: value * 100,
          kilopascal: value / 10,
          bar: value / 1000,
          atmosphere: value / 1013.25,
          millibar: value,
          psi: value / 68.9475729,
          torr: value * 0.750061683,
          inchMercury: value / 33.8638864
        },
        psi: {
          pascal: value * 6894.75729,
          kilopascal: value * 6.89475729,
          bar: value / 14.5037738,
          atmosphere: value / 14.6959488,
          millibar: value * 68.9475729,
          psi: value,
          torr: value * 51.7149326,
          inchMercury: value * 2.03602102
        },
        torr: {
          pascal: value * 133.322368,
          kilopascal: value * 0.133322368,
          bar: value / 750.061683,
          atmosphere: value / 760,
          millibar: value * 1.33322368,
          psi: value / 51.7149326,
          torr: value,
          inchMercury: value / 25.4000665
        },
        inchMercury: {
          pascal: value * 3386.38864,
          kilopascal: value * 3.38638864,
          bar: value / 29.5299831,
          atmosphere: value / 29.9212598,
          millibar: value * 33.8638864,
          psi: value / 2.03602102,
          torr: value * 25.4000665,
          inchMercury: value
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
    function handlePressureInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= 0 && v <= 1000000000) {
        const results = convertPressure(name, v);
        inputs.forEach(input => {
          input.value = results[input.name] ? formatNumber(results[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearPressureFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handlePressureInput);
    });