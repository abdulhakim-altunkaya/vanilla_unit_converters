
    const pageIdVisitorPage = "sting";

    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });
    // Conversion logic
    function convertSchmidt(name, value) {
      const ratings = {
        sweatBee: 1,
        fireAnt: 1,
        europeanHornet: 2,
        paperWasp: 3,
        harvesterAnt: 3,
        tarantulaHawk: 4,
        bulletAnt: 4,
        executionerWasp: 4,
        scorpionSting: 3.5,
        electricShock: 4,
        bulletWound: 4
      };

      let schmidtValue = name === "schmidt" ? value : value * ratings[name];
      schmidtValue = Math.min(schmidtValue, 4); // Cap at 4

      const conversions = {
        schmidt: schmidtValue,
        sweatBee: schmidtValue / 1,
        fireAnt: schmidtValue / 1,
        europeanHornet: schmidtValue / 2,
        paperWasp: schmidtValue / 3,
        harvesterAnt: schmidtValue / 3,
        tarantulaHawk: schmidtValue / 4,
        bulletAnt: schmidtValue / 4,
        executionerWasp: schmidtValue / 4,
        scorpionSting: schmidtValue / 3.5,
        electricShock: schmidtValue / 4,
        bulletWound: schmidtValue / 4
      };

      return conversions;
    }

    // Format numbers dynamically based on magnitude
    function formatNumber(value) {
        if (value === 0) return "0";
        const absValue = Math.abs(value);
        if (absValue < 1e-6 || absValue > 1e6) {
            return value.toExponential(2);
        } else {
            return parseFloat(value.toFixed(4));
        }
    }

    // Handle input changes
    function handleSchmidtInput(event) {
        const { name, value } = event.target;
        const inputs = document.querySelectorAll(".inputFields");

        const v = parseFloat(value);

        if (!isNaN(v) && v >= 0 && v <= (name === "schmidt" ? 4 : 1000)) {
            const results = convertSchmidt(name, v);
            inputs.forEach(input => {
                input.value = results[input.name] ? formatNumber(results[input.name]) : "";
            });
        }
    }


    // Clear all fields
    function clearSchmidtFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleSchmidtInput);
    });