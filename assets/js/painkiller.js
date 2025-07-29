    const conversionFactors = {
      spu: 1,
      morphine: 5,
      oxycodone: 3.3,
      hydrocodone: 5,
      tramadol: 50,
      codeine: 33.33,
      hydromorphone: 1.25,
      fentanyl: 2,
      ibuprofen: 3,
      wine: 2,
      whiskey: 2,
      coffee: 2,
      nicotine: 1,
      sleep: 1,
      coldshower: 1,
      marijuana: 1
    };

    function convert(name, rawValue) {
      const clean = rawValue.replace(",", ".").trim();
      const value = parseFloat(clean);
      if (isNaN(value) || value < 0) return null;

      const spuValue = name === "spu" ? value : value / conversionFactors[name];
      const result = {};
      for (const key in conversionFactors) {
        result[key] = parseFloat((spuValue * conversionFactors[key]).toFixed(4));
      }
      return result;
    }

    function handleInput(e) {
      const { name, value } = e.target;
      const results = convert(name, value);
      if (!results) return;

      document.querySelectorAll(".inputFields").forEach(input => {
        input.value = results[input.name] ?? "";
      });
    }

    function clearFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    document.querySelectorAll(".inputFields").forEach(input =>
      input.addEventListener("input", handleInput)
    );

    const pageIdVisitorPage = "painkiller";
    document.addEventListener("DOMContentLoaded", async function() {
      try {
          await axios.post(`https://www.eumaps.org/api/save-visitor/units?sectionName=${pageIdVisitorPage}`, {});
          
      } catch (error) {
          console.error('Error logging visit:', error.message);
      }
  });