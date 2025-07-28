
    const pageIdVisitorPage = "mass";

    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });

    // Conversion logic
    function convertValues(name, value) {
      const conversions = {
        milligram: {
          milligram: value,
          gram: value / 1000,
          kilogram: value / 1e6,
          ton: value / 1e9,
          megaton: value / 1e15,
          gigaton: value / 1e18,
          uston: value / 9.072e8,
          pound: value / 453592.37,
          ounce: value / 28349.5231,
          carat: value / 200
        },
        gram: {
          milligram: value * 1000,
          gram: value,
          kilogram: value / 1000,
          ton: value / 1e6,
          megaton: value / 1e12,
          gigaton: value / 1e15,
          uston: value / 907184.74,
          pound: value / 453.59237,
          ounce: value / 28.3495231,
          carat: value * 5
        },
        kilogram: {
          milligram: value * 1e6,
          gram: value * 1000,
          kilogram: value,
          ton: value / 1000,
          megaton: value / 1e9,
          gigaton: value / 1e12,
          uston: value / 907.18474,
          pound: value * 2.20462262,
          ounce: value * 35.2739619,
          carat: value * 5000
        },
        ton: {
          milligram: value * 1e9,
          gram: value * 1e6,
          kilogram: value * 1000,
          ton: value,
          megaton: value / 1e6,
          gigaton: value / 1e9,
          uston: value * 1.10231131,
          pound: value * 2204.62262,
          ounce: value * 35273.9619,
          carat: value * 5e6
        },
        megaton: {
          milligram: value * 1e15,
          gram: value * 1e12,
          kilogram: value * 1e9,
          ton: value * 1e6,
          megaton: value,
          gigaton: value / 1000,
          uston: value * 1.10231131e6,
          pound: value * 2.20462262e9,
          ounce: value * 3.52739619e10,
          carat: value * 5e12
        },
        gigaton: {
          milligram: value * 1e18,
          gram: value * 1e15,
          kilogram: value * 1e12,
          ton: value * 1e9,
          megaton: value * 1000,
          gigaton: value,
          uston: value * 1.10231131e9,
          pound: value * 2.20462262e12,
          ounce: value * 3.52739619e13,
          carat: value * 5e15
        },
        uston: {
          milligram: value * 9.072e8,
          gram: value * 907184.74,
          kilogram: value * 907.18474,
          ton: value / 1.10231131,
          megaton: value / 1.10231131e6,
          gigaton: value / 1.10231131e9,
          uston: value,
          pound: value * 2000,
          ounce: value * 32000,
          carat: value * 4.536e6
        },
        pound: {
          milligram: value * 453592.37,
          gram: value * 453.59237,
          kilogram: value / 2.20462262,
          ton: value / 2204.62262,
          megaton: value / 2.20462262e9,
          gigaton: value / 2.20462262e12,
          uston: value / 2000,
          pound: value,
          ounce: value * 16,
          carat: value * 2267.96185
        },
        ounce: {
          milligram: value * 28349.5231,
          gram: value * 28.3495231,
          kilogram: value / 35.2739619,
          ton: value / 35273.9619,
          megaton: value / 3.52739619e10,
          gigaton: value / 3.52739619e13,
          uston: value / 32000,
          pound: value / 16,
          ounce: value,
          carat: value * 141.747616
        },
        carat: {
          milligram: value * 200,
          gram: value / 5,
          kilogram: value / 5000,
          ton: value / 5e6,
          megaton: value / 5e12,
          gigaton: value / 5e15,
          uston: value / 4.536e6,
          pound: value / 2267.96185,
          ounce: value / 141.747616,
          carat: value
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
    function handleChangeMassUnits(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >=0 && v <= 1000000000) {
        const newValues = convertValues(name, v);
        inputs.forEach(input => {
          input.value = newValues[input.name] ? formatNumber(newValues[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearFields() {
      const inputs = document.querySelectorAll(".inputFields");
      inputs.forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleChangeMassUnits);
    });