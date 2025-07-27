
    const pageIdVisitorPage = "unit_radiation";

    // Conversion logic for Gamma Rays
    function convertGamma(name, value) {
      const conversions = {
        grayGamma: {
          grayGamma: value,
          milligrayGamma: value * 1000,
          sievertGamma: value * 1, // W_R = 1 for gamma rays
          millisievertGamma: value * 1000,
          radGamma: value * 100,
          remGamma: value * 100,
          cancerRiskGamma: value * 5, // Approx. 5% increased lifetime fatal cancer risk per Sv
          flightDurationGamma: value / 0.000004, // 1 hour = 0.000004 Sv
          chestXraysGamma: value / 0.0001 // 1 X-ray = 0.0001 Sv
        },
        milligrayGamma: {
          grayGamma: value / 1000,
          milligrayGamma: value,
          sievertGamma: value / 1000,
          millisievertGamma: value * 1,
          radGamma: (value / 1000) * 100,
          remGamma: (value / 1000) * 100,
          cancerRiskGamma: (value / 1000) * 5,
          flightDurationGamma: (value / 1000) / 0.000004,
          chestXraysGamma: (value / 1000) / 0.0001
        },
        sievertGamma: {
          grayGamma: value * 1,
          milligrayGamma: value * 1000,
          sievertGamma: value,
          millisievertGamma: value * 1000,
          radGamma: value * 100,
          remGamma: value * 100,
          cancerRiskGamma: value * 5,
          flightDurationGamma: value / 0.000004,
          chestXraysGamma: value / 0.0001
        },
        millisievertGamma: {
          grayGamma: value / 1000,
          milligrayGamma: value * 1,
          sievertGamma: value / 1000,
          millisievertGamma: value,
          radGamma: (value / 1000) * 100,
          remGamma: (value / 1000) * 100,
          cancerRiskGamma: (value / 1000) * 5,
          flightDurationGamma: (value / 1000) / 0.000004,
          chestXraysGamma: (value / 1000) / 0.0001
        },
        radGamma: {
          grayGamma: value / 100,
          milligrayGamma: (value / 100) * 1000,
          sievertGamma: value / 100,
          millisievertGamma: (value / 100) * 1000,
          radGamma: value,
          remGamma: value * 1,
          cancerRiskGamma: (value / 100) * 5,
          flightDurationGamma: (value / 100) / 0.000004,
          chestXraysGamma: (value / 100) / 0.0001
        },
        remGamma: {
          grayGamma: value / 100,
          milligrayGamma: (value / 100) * 1000,
          sievertGamma: value / 100,
          millisievertGamma: (value / 100) * 1000,
          radGamma: value * 1,
          remGamma: value,
          cancerRiskGamma: (value / 100) * 5,
          flightDurationGamma: (value / 100) / 0.000004,
          chestXraysGamma: (value / 100) / 0.0001
        },
        cancerRiskGamma: {
          grayGamma: value / 5,
          milligrayGamma: (value / 5) * 1000,
          sievertGamma: value / 5,
          millisievertGamma: (value / 5) * 1000,
          radGamma: (value / 5) * 100,
          remGamma: (value / 5) * 100,
          cancerRiskGamma: value,
          flightDurationGamma: (value / 5) / 0.000004,
          chestXraysGamma: (value / 5) / 0.0001
        },
        flightDurationGamma: {
          grayGamma: value * 0.000004,
          milligrayGamma: (value * 0.000004) * 1000,
          sievertGamma: value * 0.000004,
          millisievertGamma: (value * 0.000004) * 1000,
          radGamma: (value * 0.000004) * 100,
          remGamma: (value * 0.000004) * 100,
          cancerRiskGamma: (value * 0.000004) * 5,
          flightDurationGamma: value,
          chestXraysGamma: value * 0.000004 / 0.0001
        },
        chestXraysGamma: {
          grayGamma: value * 0.0001,
          milligrayGamma: (value * 0.0001) * 1000,
          sievertGamma: value * 0.0001,
          millisievertGamma: (value * 0.0001) * 1000,
          radGamma: (value * 0.0001) * 100,
          remGamma: (value * 0.0001) * 100,
          cancerRiskGamma: (value * 0.0001) * 5,
          flightDurationGamma: (value * 0.0001) / 0.000004,
          chestXraysGamma: value
        }
      };
      return conversions[name];
    }

    // Conversion logic for Alpha Particles
    function convertAlpha(name, value) {
      const conversions = {
        grayAlpha: {
          grayAlpha: value,
          milligrayAlpha: value * 1000,
          sievertAlpha: value * 20, // W_R = 20 for alpha particles
          millisievertAlpha: value * 20 * 1000,
          radAlpha: value * 100,
          remAlpha: value * 20 * 100,
          cancerRiskAlpha: value * 20 * 5,
          issDurationAlpha: value / 0.0000015, // 0.00003 Sv/hour ÷ 20
          moonDurationAlpha: value / 0.000003125, // 0.0000625 Sv/hour ÷ 20
          marsDurationAlpha: value / 0.000001875 // 0.0000375 Sv/hour ÷ 20
        },
        milligrayAlpha: {
          grayAlpha: value / 1000,
          milligrayAlpha: value,
          sievertAlpha: (value / 1000) * 20,
          millisievertAlpha: value * 20,
          radAlpha: (value / 1000) * 100,
          remAlpha: (value / 1000) * 20 * 100,
          cancerRiskAlpha: (value / 1000) * 20 * 5,
          issDurationAlpha: (value / 1000) / 0.0000015,
          moonDurationAlpha: (value / 1000) / 0.000003125,
          marsDurationAlpha: (value / 1000) / 0.000001875
        },
        sievertAlpha: {
          grayAlpha: value / 20,
          milligrayAlpha: (value / 20) * 1000,
          sievertAlpha: value,
          millisievertAlpha: value * 1000,
          radAlpha: (value / 20) * 100,
          remAlpha: value * 100,
          cancerRiskAlpha: value * 5,
          issDurationAlpha: value / 0.00003,
          moonDurationAlpha: value / 0.0000625,
          marsDurationAlpha: value / 0.0000375
        },
        millisievertAlpha: {
          grayAlpha: value / (20 * 1000),
          milligrayAlpha: value / 20,
          sievertAlpha: value / 1000,
          millisievertAlpha: value,
          radAlpha: (value / (20 * 1000)) * 100,
          remAlpha: (value / 1000) * 100,
          cancerRiskAlpha: (value / 1000) * 5,
          issDurationAlpha: (value / 1000) / 0.00003,
          moonDurationAlpha: (value / 1000) / 0.0000625,
          marsDurationAlpha: (value / 1000) / 0.0000375
        },
        radAlpha: {
          grayAlpha: value / 100,
          milligrayAlpha: (value / 100) * 1000,
          sievertAlpha: (value / 100) * 20,
          millisievertAlpha: (value / 100) * 20 * 1000,
          radAlpha: value,
          remAlpha: value * 20,
          cancerRiskAlpha: (value / 100) * 20 * 5,
          issDurationAlpha: (value / 100) / 0.0000015,
          moonDurationAlpha: (value / 100) / 0.000003125,
          marsDurationAlpha: (value / 100) / 0.000001875
        },
        remAlpha: {
          grayAlpha: value / (20 * 100),
          milligrayAlpha: (value / (20 * 100)) * 1000,
          sievertAlpha: value / 100,
          millisievertAlpha: (value / 100) * 1000,
          radAlpha: value / 20,
          remAlpha: value,
          cancerRiskAlpha: (value / 100) * 5,
          issDurationAlpha: (value / 100) / 0.00003,
          moonDurationAlpha: (value / 100) / 0.0000625,
          marsDurationAlpha: (value / 100) / 0.0000375
        },
        cancerRiskAlpha: {
          grayAlpha: value / (20 * 5),
          milligrayAlpha: (value / (20 * 5)) * 1000,
          sievertAlpha: value / 5,
          millisievertAlpha: (value / 5) * 1000,
          radAlpha: (value / (20 * 5)) * 100,
          remAlpha: (value / 5) * 100,
          cancerRiskAlpha: value,
          issDurationAlpha: (value / 5) / 0.00003,
          moonDurationAlpha: (value / 5) / 0.0000625,
          marsDurationAlpha: (value / 5) / 0.0000375
        },
        issDurationAlpha: {
          grayAlpha: value * 0.0000015, // 0.00003 Sv/hour ÷ 20
          milligrayAlpha: (value * 0.0000015) * 1000,
          sievertAlpha: value * 0.00003,
          millisievertAlpha: (value * 0.00003) * 1000,
          radAlpha: (value * 0.0000015) * 100,
          remAlpha: (value * 0.00003) * 100,
          cancerRiskAlpha: (value * 0.00003) * 5,
          issDurationAlpha: value,
          moonDurationAlpha: (value * 0.00003) / 0.0000625,
          marsDurationAlpha: (value * 0.00003) / 0.0000375
        },
        moonDurationAlpha: {
          grayAlpha: value * 0.000003125, // 0.0000625 Sv/hour ÷ 20
          milligrayAlpha: (value * 0.000003125) * 1000,
          sievertAlpha: value * 0.0000625,
          millisievertAlpha: (value * 0.0000625) * 1000,
          radAlpha: (value * 0.000003125) * 100,
          remAlpha: (value * 0.0000625) * 100,
          cancerRiskAlpha: (value * 0.0000625) * 5,
          issDurationAlpha: (value * 0.0000625) / 0.00003,
          moonDurationAlpha: value,
          marsDurationAlpha: (value * 0.0000625) / 0.0000375
        },
        marsDurationAlpha: {
          grayAlpha: value * 0.000001875, // 0.0000375 Sv/hour ÷ 20
          milligrayAlpha: (value * 0.000001875) * 1000,
          sievertAlpha: value * 0.0000375,
          millisievertAlpha: (value * 0.0000375) * 1000,
          radAlpha: (value * 0.000001875) * 100,
          remAlpha: (value * 0.0000375) * 100,
          cancerRiskAlpha: (value * 0.0000375) * 5,
          issDurationAlpha: (value * 0.0000375) / 0.00003,
          moonDurationAlpha: (value * 0.0000375) / 0.0000625,
          marsDurationAlpha: value
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
    function handleRadiationInput(event) {
      const { name, value } = event.target;
      const inputs = document.querySelectorAll(".inputFields");

      // Allow empty string, "-", or "-." while typing
      if (value === "" || value === "-" || value === "-.") {
        inputs.forEach(input => input.value = "");
        return;
      }

      const v = parseFloat(value);

      if (!isNaN(v) && v >= 0 && v <= (name.includes("cancerRisk") ? 100 : name.includes("flightDuration") || name.includes("issDuration") || name.includes("moonDuration") || name.includes("marsDuration") ? 100000 : 1000000000)) {
        let results;
        if (name.includes("Gamma")) {
          results = convertGamma(name, v);
          // Update only Gamma inputs
          document.querySelectorAll(".inputFields[name*='Gamma']").forEach(input => {
            input.value = results[input.name] ? formatNumber(results[input.name]) : "";
          });
        } else if (name.includes("Alpha")) {
          results = convertAlpha(name, v);
          // Update only Alpha inputs
          document.querySelectorAll(".inputFields[name*='Alpha']").forEach(input => {
            input.value = results[input.name] ? formatNumber(results[input.name]) : "";
          });
        }
      } else if (!isNaN(v)) {
        alert("Enter a valid value");
        inputs.forEach(input => input.value = "");
      }
    }

    // Clear all fields
    function clearRadiationFields() {
      document.querySelectorAll(".inputFields").forEach(input => input.value = "");
    }

    // Add event listeners to inputs
    document.querySelectorAll(".inputFields").forEach(input => {
      if (!input.name.includes("cancerRisk")) { // Cancer risk is read-only
        input.addEventListener("input", handleRadiationInput);
      }
    });