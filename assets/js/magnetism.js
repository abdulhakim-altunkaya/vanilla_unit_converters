    const pageIdVisitorPage = "unit_magnetic";

    // Reference values in Tesla
    const REFERENCE_VALUES = {
      phoneMagnet: 0.0001,    // 1 G
      fridgeMagnet: 0.01,     // 100 G
      earthField: 0.00005,    // 0.5 G
      medicalScanner: 1.5,    // 1.5 T (typical MRI)
      solarSunspot: 0.3,      // 0.3 T
      neutronStar: 100000000  // 100 million T
    };

    // Conversion logic for Magnetic Flux Density
    function convertMagnetic(name, value) {
      let baseTesla;
      
      // Convert input value to base Tesla
      switch(name) {
        case 'tesla':
          baseTesla = value;
          break;
        case 'millitesla':
          baseTesla = value / 1000;
          break;
        case 'microtesla':
          baseTesla = value / 1000000;
          break;
        case 'gauss':
          baseTesla = value / 10000;
          break;
        case 'phoneMagnet':
          baseTesla = value * REFERENCE_VALUES.phoneMagnet;
          break;
        case 'fridgeMagnet':
          baseTesla = value * REFERENCE_VALUES.fridgeMagnet;
          break;
        case 'earthField':
          baseTesla = value * REFERENCE_VALUES.earthField;
          break;
        case 'medicalScanner':
          baseTesla = value * REFERENCE_VALUES.medicalScanner;
          break;
        case 'solarSunspot':
          baseTesla = value * REFERENCE_VALUES.solarSunspot;
          break;
        case 'neutronStar':
          baseTesla = value * REFERENCE_VALUES.neutronStar;
          break;
        default:
          baseTesla = 0;
      }

      // Calculate all conversions from base Tesla
      return {
        tesla: baseTesla,
        millitesla: baseTesla * 1000,
        microtesla: baseTesla * 1000000,
        gauss: baseTesla * 10000,
        phoneMagnet: baseTesla / REFERENCE_VALUES.phoneMagnet,
        fridgeMagnet: baseTesla / REFERENCE_VALUES.fridgeMagnet,
        earthField: baseTesla / REFERENCE_VALUES.earthField,
        medicalScanner: baseTesla / REFERENCE_VALUES.medicalScanner,
        solarSunspot: baseTesla / REFERENCE_VALUES.solarSunspot,
        neutronStar: baseTesla / REFERENCE_VALUES.neutronStar
      };
    }

    // Format numbers dynamically based on magnitude
    function formatNumber(value) {
      if (value === 0) return "0";
      const absValue = Math.abs(value);
      
      // For very small or very large numbers, use scientific notation
      if (absValue < 1e-6 || absValue > 1e6) {
        return value.toExponential(4);
      }
      // For numbers between 0.001 and 1, show up to 6 decimal places
      else if (absValue < 1) {
        return parseFloat(value.toFixed(6));
      }
      // For numbers between 1 and 1,000,000, show up to 2 decimal places
      else {
        return parseFloat(value.toFixed(2));
      }
    }

    // Handle input changes
    function handleMagneticInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow incomplete inputs (e.g., "", "-", ".", "-.", "0.") to continue typing
      if (value === "" || value === "-" || value === "." || value === "-." || value.match(/^0\.?$/)) {
        return;
      }

      const v = parseFloat(value);

      // Only process if the input is a valid number
      if (!isNaN(v) && v >= 0) {
        const results = convertMagnetic(name, v);
        // Update all inputs except the one being edited
        document.querySelectorAll(".inputFields").forEach(input => {
          if (input.name !== name) {
            input.value = results[input.name] ? formatNumber(results[input.name]) : "";
          }
        });
      } else if (value !== "" && !value.match(/^[-]?\d*\.?\d*$/)) {
        // Alert only if the input is invalid (not a number, excluding valid partial inputs)
        alert("Please enter a valid positive number");
      }
    }

    // Clear all fields
    function clearMagneticFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      input.addEventListener("input", handleMagneticInput);
    });

    // Add clickable examples
    document.querySelectorAll(".example-item").forEach(item => {
      item.style.cursor = "pointer";
      item.addEventListener("click", function() {
        const text = this.textContent;
        let value;
        
        if (text.includes("Phone Magnet")) value = 1;
        else if (text.includes("Fridge Magnet")) value = 1;
        else if (text.includes("Earth's Field")) value = 1;
        else if (text.includes("Medical Scanner")) value = 1;
        else if (text.includes("Solar Sunspot")) value = 1;
        else if (text.includes("Neutron Star")) value = 1;
        
        if (value !== undefined) {
          const fieldName = text.match(/Phone|Fridge|Earth|Medical|Solar|Neutron/)[0].toLowerCase() + 
                           (text.includes("Magnet") ? "Magnet" : 
                            text.includes("Field") ? "Field" :
                            text.includes("Scanner") ? "Scanner" :
                            text.includes("Sunspot") ? "Sunspot" : "Star");
          document.getElementById(fieldName).value = value;
          handleMagneticInput({target: document.getElementById(fieldName)});
        }
      });
    });