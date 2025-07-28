
    const pageIdVisitorPage = "power";

    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });

    // Conversion logic
    function convertPower(name, value) {
      const conversions = {
        watt: {
          watt: value,
          kilowatt: value / 1000,
          megawatt: value / 1e6,
          horsepowerImperial: value / 745.7,
          horsepowerMetric: value / 735.49875,
          footPoundPerSecond: value / 1.355818,
          caloriePerSecond: value / 4.184,
          kilocaloriePerSecond: value / 4184,
          ergPerSecond: value * 1e7,
          pferdestarke: value / 735.49875,
          milliwatt: value * 1000
        },
        kilowatt: {
          watt: value * 1000,
          kilowatt: value,
          megawatt: value / 1000,
          horsepowerImperial: value * 1.34102209,
          horsepowerMetric: value * 1.35962162,
          footPoundPerSecond: value * 737.562149,
          caloriePerSecond: value * 238.8459,
          kilocaloriePerSecond: value * 0.2388459,
          ergPerSecond: value * 1e10,
          pferdestarke: value * 1.35962162,
          milliwatt: value * 1e6
        },
        megawatt: {
          watt: value * 1e6,
          kilowatt: value * 1000,
          megawatt: value,
          horsepowerImperial: value * 1341.02209,
          horsepowerMetric: value * 1359.62162,
          footPoundPerSecond: value * 737562.149,
          caloriePerSecond: value * 238845.9,
          kilocaloriePerSecond: value * 238.8459,
          ergPerSecond: value * 1e13,
          pferdestarke: value * 1359.62162,
          milliwatt: value * 1e9
        },
        horsepowerImperial: {
          watt: value * 745.7,
          kilowatt: value * 0.7457,
          megawatt: value * 0.0007457,
          horsepowerImperial: value,
          horsepowerMetric: value * 1.01386766,
          footPoundPerSecond: value * 550,
          caloriePerSecond: value * 178.107354,
          kilocaloriePerSecond: value * 0.178107354,
          ergPerSecond: value * 7.457e9,
          pferdestarke: value * 1.01386766,
          milliwatt: value * 745700
        },
        horsepowerMetric: {
          watt: value * 735.49875,
          kilowatt: value * 0.73549875,
          megawatt: value * 0.00073549875,
          horsepowerImperial: value * 0.98632007,
          horsepowerMetric: value,
          footPoundPerSecond: value * 542.476038,
          caloriePerSecond: value * 175.670858,
          kilocaloriePerSecond: value * 0.175670858,
          ergPerSecond: value * 7.3549875e9,
          pferdestarke: value,
          milliwatt: value * 735498.75
        },
        footPoundPerSecond: {
          watt: value * 1.355818,
          kilowatt: value * 0.001355818,
          megawatt: value * 1.355818e-6,
          horsepowerImperial: value * 0.00181818182,
          horsepowerMetric: value * 0.00184339836,
          footPoundPerSecond: value,
          caloriePerSecond: value * 0.323831554,
          kilocaloriePerSecond: value * 0.000323831554,
          ergPerSecond: value * 1.355818e7,
          pferdestarke: value * 0.00184339836,
          milliwatt: value * 1355.818
        },
        caloriePerSecond: {
          watt: value * 4.184,
          kilowatt: value * 0.004184,
          megawatt: value * 4.184e-6,
          horsepowerImperial: value * 0.00561459124,
          horsepowerMetric: value * 0.00568865545,
          footPoundPerSecond: value * 3.08802521,
          caloriePerSecond: value,
          kilocaloriePerSecond: value / 1000,
          ergPerSecond: value * 4.184e7,
          pferdestarke: value * 0.00568865545,
          milliwatt: value * 4184
        },
        kilocaloriePerSecond: {
          watt: value * 4184,
          kilowatt: value * 4.184,
          megawatt: value * 0.004184,
          horsepowerImperial: value * 5.61459124,
          horsepowerMetric: value * 5.68865545,
          footPoundPerSecond: value * 3088.02521,
          caloriePerSecond: value * 1000,
          kilocaloriePerSecond: value,
          ergPerSecond: value * 4.184e10,
          pferdestarke: value * 5.68865545,
          milliwatt: value * 4.184e6
        },
        ergPerSecond: {
          watt: value * 1e-7,
          kilowatt: value * 1e-10,
          megawatt: value * 1e-13,
          horsepowerImperial: value * 1.34102209e-10,
          horsepowerMetric: value * 1.35962162e-10,
          footPoundPerSecond: value * 7.37562149e-8,
          caloriePerSecond: value * 2.388459e-8,
          kilocaloriePerSecond: value * 2.388459e-11,
          ergPerSecond: value,
          pferdestarke: value * 1.35962162e-10,
          milliwatt: value * 1e-4
        },
        pferdestarke: {
          watt: value * 735.49875,
          kilowatt: value * 0.73549875,
          megawatt: value * 0.00073549875,
          horsepowerImperial: value * 0.98632007,
          horsepowerMetric: value,
          footPoundPerSecond: value * 542.476038,
          caloriePerSecond: value * 175.670858,
          kilocaloriePerSecond: value * 0.175670858,
          ergPerSecond: value * 7.3549875e9,
          pferdestarke: value,
          milliwatt: value * 735498.75
        },
        milliwatt: {
          watt: value * 0.001,
          kilowatt: value * 1e-6,
          megawatt: value * 1e-9,
          horsepowerImperial: value * 1.34102209e-6,
          horsepowerMetric: value * 1.35962162e-6,
          footPoundPerSecond: value * 0.000737562149,
          caloriePerSecond: value * 0.0002388459,
          kilocaloriePerSecond: value * 2.388459e-7,
          ergPerSecond: value * 10000,
          pferdestarke: value * 1.35962162e-6,
          milliwatt: value
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
    function handlePowerInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= 0 && v <= 1000000000) {
        const results = convertPower(name, v);
        inputs.forEach(input => {
          input.value = results[input.name] ? formatNumber(results[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearPowerFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handlePowerInput);
    });