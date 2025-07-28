
    const pageIdVisitorPage = "area";

    
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
        sqMillimeter: {
          sqMillimeter: value,
          sqCentimeter: value / 100,
          sqMeter: value / 1e6,
          sqKilometer: value / 1e12,
          sqFeet: value / 92903.04,
          sqInch: value / 645.16,
          sqYard: value / 836127.36,
          acre: value / 4.047e9,
          hectare: value / 1e10,
          sqMile: value / 2.59e12,
          are: value / 1e8,
          sqMicrometer: value * 1e6,
          barn: value * 1e22
        },
        sqCentimeter: {
          sqMillimeter: value * 100,
          sqCentimeter: value,
          sqMeter: value / 10000,
          sqKilometer: value / 1e10,
          sqFeet: value / 929.0304,
          sqInch: value / 6.4516,
          sqYard: value / 8361.2736,
          acre: value / 4.047e7,
          hectare: value / 1e8,
          sqMile: value / 2.59e10,
          are: value / 1e6,
          sqMicrometer: value * 1e8,
          barn: value * 1e24
        },
        sqMeter: {
          sqMillimeter: value * 1e6,
          sqCentimeter: value * 10000,
          sqMeter: value,
          sqKilometer: value / 1e6,
          sqFeet: value * 10.7639,
          sqInch: value * 1550.0031,
          sqYard: value * 1.19599,
          acre: value / 4046.856422,
          hectare: value / 10000,
          sqMile: value / 2.59e6,
          are: value / 100,
          sqMicrometer: value * 1e12,
          barn: value * 1e28
        },
        sqKilometer: {
          sqMillimeter: value * 1e12,
          sqCentimeter: value * 1e10,
          sqMeter: value * 1e6,
          sqKilometer: value,
          sqFeet: value * 1.076e7,
          sqInch: value * 1.55e9,
          sqYard: value * 1.196e6,
          acre: value * 247.105381,
          hectare: value * 100,
          sqMile: value / 2.59,
          are: value * 10000,
          sqMicrometer: value * 1e18,
          barn: value * 1e34
        },
        sqFeet: {
          sqMillimeter: value * 92903.04,
          sqCentimeter: value * 929.0304,
          sqMeter: value / 10.7639,
          sqKilometer: value / 1.076e7,
          sqFeet: value,
          sqInch: value * 144,
          sqYard: value / 9,
          acre: value / 43560,
          hectare: value / 107639,
          sqMile: value / 2.788e7,
          are: value / 1076.391,
          sqMicrometer: value * 9.29e10,
          barn: value * 9.29e26
        },
        sqInch: {
          sqMillimeter: value * 645.16,
          sqCentimeter: value * 6.4516,
          sqMeter: value / 1550.0031,
          sqKilometer: value / 1.55e9,
          sqFeet: value / 144,
          sqInch: value,
          sqYard: value / 1296,
          acre: value / 6272640,
          hectare: value / 1.55e7,
          sqMile: value / 4.014e9,
          are: value / 15500.031,
          sqMicrometer: value * 6.4516e8,
          barn: value * 6.4516e24
        },
        sqYard: {
          sqMillimeter: value * 836127.36,
          sqCentimeter: value * 8361.2736,
          sqMeter: value / 1.19599,
          sqKilometer: value / 1.196e6,
          sqFeet: value * 9,
          sqInch: value * 1296,
          sqYard: value,
          acre: value / 4840,
          hectare: value / 11959.9,
          sqMile: value / 3.098e6,
          are: value / 119.599,
          sqMicrometer: value * 8.3612736e11,
          barn: value * 8.3612736e27
        },
        acre: {
          sqMillimeter: value * 4.047e9,
          sqCentimeter: value * 4.047e7,
          sqMeter: value * 4046.856422,
          sqKilometer: value / 247.105381,
          sqFeet: value * 43560,
          sqInch: value * 6.273e6,
          sqYard: value * 4840,
          acre: value,
          hectare: value / 2.47105381,
          sqMile: value / 640,
          are: value * 40.46856422,
          sqMicrometer: value * 4.047e15,
          barn: value * 4.047e31
        },
        hectare: {
          sqMillimeter: value * 1e10,
          sqCentimeter: value * 1e8,
          sqMeter: value * 10000,
          sqKilometer: value / 100,
          sqFeet: value * 107639.1042,
          sqInch: value * 1.55e7,
          sqYard: value * 11959.9005,
          acre: value * 2.47105381,
          hectare: value,
          sqMile: value / 258.998811,
          are: value * 100,
          sqMicrometer: value * 1e16,
          barn: value * 1e32
        },
        sqMile: {
          sqMillimeter: value * 2.59e12,
          sqCentimeter: value * 2.59e10,
          sqMeter: value * 2.59e6,
          sqKilometer: value * 2.59,
          sqFeet: value * 2.788e7,
          sqInch: value * 4.014e9,
          sqYard: value * 3.098e6,
          acre: value * 640,
          hectare: value * 258.998811,
          sqMile: value,
          are: value * 25899.8811,
          sqMicrometer: value * 2.59e18,
          barn: value * 2.59e34
        },
        are: {
          sqMillimeter: value * 1e8,
          sqCentimeter: value * 1e6,
          sqMeter: value * 100,
          sqKilometer: value / 10000,
          sqFeet: value * 1076.39104,
          sqInch: value * 155000.31,
          sqYard: value * 119.599005,
          acre: value / 40.4685642,
          hectare: value / 100,
          sqMile: value / 25899.8811,
          are: value,
          sqMicrometer: value * 1e14,
          barn: value * 1e30
        },
        sqMicrometer: {
          sqMillimeter: value / 1e6,
          sqCentimeter: value / 1e8,
          sqMeter: value / 1e12,
          sqKilometer: value / 1e18,
          sqFeet: value / 9.29e10,
          sqInch: value / 6.4516e8,
          sqYard: value / 8.3612736e11,
          acre: value / 4.047e15,
          hectare: value / 1e16,
          sqMile: value / 2.59e18,
          are: value / 1e14,
          sqMicrometer: value,
          barn: value * 1e8
        },
        barn: {
          sqMillimeter: value / 1e22,
          sqCentimeter: value / 1e24,
          sqMeter: value / 1e28,
          sqKilometer: value / 1e34,
          sqFeet: value / 9.29e26,
          sqInch: value / 6.4516e24,
          sqYard: value / 8.3612736e27,
          acre: value / 4.047e31,
          hectare: value / 1e32,
          sqMile: value / 2.59e34,
          are: value / 1e30,
          sqMicrometer: value / 1e8,
          barn: value
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
    function handleChangeAreaUnits(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
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
      input.addEventListener("input", handleChangeAreaUnits);
    });