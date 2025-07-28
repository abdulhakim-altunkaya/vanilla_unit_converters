
    const pageIdVisitorPage = "energy";

    
  document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    
    // Conversion logic
    function convertEnergy(name, value) {
      const conversions = {
        joule: {
          joule: value,
          kilojoule: value / 1000,
          calorie: value * 0.2388459,
          kilocalorie: value * 0.0002388459,
          wattHour: value / 3600,
          kilowattHour: value / 3.6e6,
          electronvolt: value * 6.242e18
        },
        kilojoule: {
          joule: value * 1000,
          kilojoule: value,
          calorie: value * 238.8459,
          kilocalorie: value * 0.2388459,
          wattHour: value / 3.6,
          kilowattHour: value / 3600,
          electronvolt: value * 6.242e21
        },
        calorie: {
          joule: value * 4.184,
          kilojoule: value * 0.004184,
          calorie: value,
          kilocalorie: value / 1000,
          wattHour: value * 0.0011622222,
          kilowattHour: value * 1.1622222e-6,
          electronvolt: value * 2.611e19
        },
        kilocalorie: {
          joule: value * 4184,
          kilojoule: value * 4.184,
          calorie: value * 1000,
          kilocalorie: value,
          wattHour: value * 1.1622222,
          kilowattHour: value * 0.0011622222,
          electronvolt: value * 2.611e22
        },
        wattHour: {
          joule: value * 3600,
          kilojoule: value * 3.6,
          calorie: value * 860.42065,
          kilocalorie: value * 0.86042065,
          wattHour: value,
          kilowattHour: value / 1000,
          electronvolt: value * 2.247e22
        },
        kilowattHour: {
          joule: value * 3.6e6,
          kilojoule: value * 3600,
          calorie: value * 860420.65,
          kilocalorie: value * 860.42065,
          wattHour: value * 1000,
          kilowattHour: value,
          electronvolt: value * 2.247e25
        },
        electronvolt: {
          joule: value * 1.60217662e-19,
          kilojoule: value * 1.60217662e-22,
          calorie: value * 3.82929389e-20,
          kilocalorie: value * 3.82929389e-23,
          wattHour: value * 4.45049258e-23,
          kilowattHour: value * 4.45049258e-26,
          electronvolt: value
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
    function handleEnergyInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >=0 && v <= 1000000000) {
        const results = convertEnergy(name, v);
        inputs.forEach(input => {
          input.value = results[input.name] ? formatNumber(results[input.name]) : "";
        });
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearEnergyFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleEnergyInput);
    });