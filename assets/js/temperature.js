
    const pageIdVisitorPage = "temperature";
    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`https://www.eumaps.org/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });

    function convertTemperature(name, value) {
      const v = parseFloat(value);
      if (v < -1000000 || v > 1000000) {
        alert("enter a valid value");
        return;
      }
      const conversions = {
        celsius: {
          celsius: v,
          fahrenheit: (v * 9/5) + 32,
          kelvin: v + 273.15,
          rankine: (v + 273.15) * 9/5,
          reaumur: v * 4/5
        },
        fahrenheit: {
          celsius: (v - 32) * 5/9,
          fahrenheit: v,
          kelvin: ((v - 32) * 5/9) + 273.15,
          rankine: v + 459.67,
          reaumur: (v - 32) * 4/9
        },
        kelvin: {
          celsius: v - 273.15,
          fahrenheit: (v - 273.15) * 9/5 + 32,
          kelvin: v,
          rankine: v * 9/5,
          reaumur: (v - 273.15) * 4/5
        },
        rankine: {
          celsius: (v - 491.67) * 5/9,
          fahrenheit: v - 459.67,
          kelvin: v * 5/9,
          rankine: v,
          reaumur: (v - 491.67) * 4/9
        },
        reaumur: {
          celsius: v * 5/4,
          fahrenheit: (v * 9/4) + 32,
          kelvin: (v * 5/4) + 273.15,
          rankine: (v * 9/4) + 491.67,
          reaumur: v
        }
      };
      return conversions[name];
    }

    function handleTemperatureInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string or just "-" while typing
      if (value === "" || value === "-" || value === "-.") {
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= -1000000 && v <= 1000000) {
        const results = convertTemperature(name, v);
        inputs.forEach(input => {
          input.value = parseFloat(results[input.name].toFixed(5));
        });
      }
    }


    function clearTemperatureFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleTemperatureInput);
    });