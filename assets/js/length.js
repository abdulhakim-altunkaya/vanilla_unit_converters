  
    const pageIdVisitorPage = "unit_length";

    /*
    document.addEventListener("DOMContentLoaded", function() {
      axios.post(`/serversavevisitor/${pageIdVisitorPage}`, {})
        .catch(error => console.error('Error logging visit:', error.message));
    });
    */

    // Conversion logic
    function convertValues(name, value) {
      const conversions = {
        attometer: {
          attometer: value,
          femtometer: value / 1e3,
          picometer: value / 1e6,
          nanometer: value / 1e9,
          micrometer: value / 1e12,
          millimeter: value / 1e15,
          centimeter: value / 1e16,
          meter: value / 1e18,
          kilometer: value / 1e21,
          thou: value / (25.4 * 1e12),
          inch: value / (2.54 * 1e16),
          feet: value / (3.048 * 1e17),
          yard: value / (9.144 * 1e17),
          mileLand: value / (1.609344 * 1e21),
          mileSea: value / (1.852 * 1e21),
          astroUnit: value / (1.496 * 1e29),
          lightYear: value / (9.461 * 1e33)
        },
        femtometer: {
          attometer: value * 1e3,
          femtometer: value,
          picometer: value / 1e3,
          nanometer: value / 1e6,
          micrometer: value / 1e9,
          millimeter: value / 1e12,
          centimeter: value / 1e13,
          meter: value / 1e15,
          kilometer: value / 1e18,
          thou: value / (25.4 * 1e9),
          inch: value / (2.54 * 1e13),
          feet: value / (3.048 * 1e14),
          yard: value / (9.144 * 1e14),
          mileLand: value / (1.609344 * 1e18),
          mileSea: value / (1.852 * 1e18),
          astroUnit: value / (1.496 * 1e26),
          lightYear: value / (9.461 * 1e30)
        },
        picometer: {
          attometer: value * 1e6,
          femtometer: value * 1e3,
          picometer: value,
          nanometer: value / 1e3,
          micrometer: value / 1e6,
          millimeter: value / 1e9,
          centimeter: value / 1e10,
          meter: value / 1e12,
          kilometer: value / 1e15,
          thou: value / (25.4 * 1e6),
          inch: value / (2.54 * 1e10),
          feet: value / (3.048 * 1e11),
          yard: value / (9.144 * 1e11),
          mileLand: value / (1.609344 * 1e15),
          mileSea: value / (1.852 * 1e15),
          astroUnit: value / (1.496 * 1e23),
          lightYear: value / (9.461 * 1e27)
        },
        nanometer: {
          attometer: value * 1e9,
          femtometer: value * 1e6,
          picometer: value * 1e3,
          nanometer: value,
          micrometer: value / 1e3,
          millimeter: value / 1e6,
          centimeter: value / 1e7,
          meter: value / 1e9,
          kilometer: value / 1e12,
          thou: value / (25.4 * 1e3),
          inch: value / (2.54 * 1e7),
          feet: value / (3.048 * 1e8),
          yard: value / (9.144 * 1e8),
          mileLand: value / (1.609344 * 1e12),
          mileSea: value / (1.852 * 1e12),
          astroUnit: value / (1.496 * 1e20),
          lightYear: value / (9.461 * 1e24)
        },
        micrometer: {
          attometer: value * 1e12,
          femtometer: value * 1e9,
          picometer: value * 1e6,
          nanometer: value * 1e3,
          micrometer: value,
          millimeter: value / 1e3,
          centimeter: value / 1e4,
          meter: value / 1e6,
          kilometer: value / 1e9,
          thou: value / 25.4,
          inch: value / 25400,
          feet: value / 304800,
          yard: value / 914400,
          mileLand: value / 1.609e9,
          mileSea: value / 1.852e9,
          astroUnit: value / 1.496e17,
          lightYear: value / 9.461e21
        },
        millimeter: {
          attometer: value * 1e15,
          femtometer: value * 1e12,
          picometer: value * 1e9,
          nanometer: value * 1e6,
          micrometer: value * 1e3,
          millimeter: value,
          centimeter: value / 10,
          meter: value / 1e3,
          kilometer: value / 1e6,
          thou: value / 0.0254,
          inch: value / 25.4,
          feet: value / 304.8,
          yard: value / 914.4,
          mileLand: value / 1.609e6,
          mileSea: value / 1.852e6,
          astroUnit: value / 1.496e14,
          lightYear: value / 9.461e18
        },
        centimeter: {
          attometer: value * 1e16,
          femtometer: value * 1e13,
          picometer: value * 1e10,
          nanometer: value * 1e7,
          micrometer: value * 1e4,
          millimeter: value * 10,
          centimeter: value,
          meter: value / 100,
          kilometer: value / 1e5,
          thou: value * 393.701,
          inch: value / 2.54,
          feet: value / 30.48,
          yard: value / 91.44,
          mileLand: value / 160934.4,
          mileSea: value / 185200,
          astroUnit: value / 1.496e13,
          lightYear: value / 9.461e17
        },
        meter: {
          attometer: value * 1e18,
          femtometer: value * 1e15,
          picometer: value * 1e12,
          nanometer: value * 1e9,
          micrometer: value * 1e6,
          millimeter: value * 1e3,
          centimeter: value * 100,
          meter: value,
          kilometer: value / 1000,
          thou: value * 39370.1,
          inch: value * 39.3701,
          feet: value * 3.28084,
          yard: value * 1.09361,
          mileLand: value / 1609.344,
          mileSea: value / 1852,
          astroUnit: value / 1.496e11,
          lightYear: value / 9.461e15
        },
        kilometer: {
          attometer: value * 1e21,
          femtometer: value * 1e18,
          picometer: value * 1e15,
          nanometer: value * 1e12,
          micrometer: value * 1e9,
          millimeter: value * 1e6,
          centimeter: value * 1e5,
          meter: value * 1000,
          kilometer: value,
          thou: value * 3.937e7,
          inch: value * 39370.1,
          feet: value * 3280.84,
          yard: value * 1093.61,
          mileLand: value / 1.609344,
          mileSea: value / 1.852,
          astroUnit: value / 149597.87,
          lightYear: value / 9.461e12
        },
        thou: {
          attometer: value * 2.54e13,
          femtometer: value * 2.54e10,
          picometer: value * 2.54e7,
          nanometer: value * 25400,
          micrometer: value * 25.4,
          millimeter: value * 0.0254,
          centimeter: value * 0.00254,
          meter: value * 2.54e-5,
          kilometer: value * 2.54e-8,
          thou: value,
          inch: value / 1000,
          feet: value / 12000,
          yard: value / 36000,
          mileLand: value / 6.336e6,
          mileSea: value / 7.291e6,
          astroUnit: value / 5.889e13,
          lightYear: value / 3.724e17
        },
        inch: {
          attometer: value * 2.54e16,
          femtometer: value * 2.54e13,
          picometer: value * 2.54e10,
          nanometer: value * 2.54e7,
          micrometer: value * 25400,
          millimeter: value * 25.4,
          centimeter: value * 2.54,
          meter: value * 0.0254,
          kilometer: value * 2.54e-5,
          thou: value * 1000,
          inch: value,
          feet: value / 12,
          yard: value / 36,
          mileLand: value / 63360,
          mileSea: value / 72913.3858,
          astroUnit: value / 5.889e12,
          lightYear: value / 3.724e16
        },
        feet: {
          attometer: value * 3.048e17,
          femtometer: value * 3.048e14,
          picometer: value * 3.048e11,
          nanometer: value * 3.048e8,
          micrometer: value * 304800,
          millimeter: value * 304.8,
          centimeter: value * 30.48,
          meter: value * 0.3048,
          kilometer: value * 0.0003048,
          thou: value * 12000,
          inch: value * 12,
          feet: value,
          yard: value / 3,
          mileLand: value / 5280,
          mileSea: value / 6076.12,
          astroUnit: value / 4.901e12,
          lightYear: value / 3.103e16
        },
        yard: {
          attometer: value * 9.144e17,
          femtometer: value * 9.144e14,
          picometer: value * 9.144e11,
          nanometer: value * 9.144e8,
          micrometer: value * 914400,
          millimeter: value * 914.4,
          centimeter: value * 91.44,
          meter: value * 0.9144,
          kilometer: value * 0.0009144,
          thou: value * 36000,
          inch: value * 36,
          feet: value * 3,
          yard: value,
          mileLand: value / 1760,
          mileSea: value / 2025.37,
          astroUnit: value / 1.634e12,
          lightYear: value / 1.034e16
        },
        mileLand: {
          attometer: value * 1.609344e21,
          femtometer: value * 1.609344e18,
          picometer: value * 1.609344e15,
          nanometer: value * 1.609344e12,
          micrometer: value * 1.609344e9,
          millimeter: value * 1.609344e6,
          centimeter: value * 160934.4,
          meter: value * 1609.344,
          kilometer: value * 1.609344,
          thou: value * 6.336e6,
          inch: value * 63360,
          feet: value * 5280,
          yard: value * 1760,
          mileLand: value,
          mileSea: value * 1.15078,
          astroUnit: value / 92955807.3,
          lightYear: value / 5.878e12
        },
        mileSea: {
          attometer: value * 1.852e21,
          femtometer: value * 1.852e18,
          picometer: value * 1.852e15,
          nanometer: value * 1.852e12,
          micrometer: value * 1.852e9,
          millimeter: value * 1.852e6,
          centimeter: value * 185200,
          meter: value * 1852,
          kilometer: value * 1.852,
          thou: value * 7.291e6,
          inch: value * 72913.3858,
          feet: value * 6076.12,
          yard: value * 2025.37,
          mileLand: value / 1.15078,
          mileSea: value,
          astroUnit: value / 80847.3,
          lightYear: value / 4.979e12
        },
        astroUnit: {
          attometer: value * 1.496e29,
          femtometer: value * 1.496e26,
          picometer: value * 1.496e23,
          nanometer: value * 1.496e20,
          micrometer: value * 1.496e17,
          millimeter: value * 1.496e14,
          centimeter: value * 1.496e13,
          meter: value * 1.496e11,
          kilometer: value * 1.496e8,
          thou: value * 5.889e13,
          inch: value * 5.889e12,
          feet: value * 4.901e12,
          yard: value * 1.634e12,
          mileLand: value * 92955807.3,
          mileSea: value * 80847.3,
          astroUnit: value,
          lightYear: value / 63241.1
        },
        lightYear: {
          attometer: value * 9.461e33,
          femtometer: value * 9.461e30,
          picometer: value * 9.461e27,
          nanometer: value * 9.461e24,
          micrometer: value * 9.461e21,
          millimeter: value * 9.461e18,
          centimeter: value * 9.461e17,
          meter: value * 9.461e15,
          kilometer: value * 9.461e12,
          thou: value * 3.724e17,
          inch: value * 3.724e16,
          feet: value * 3.103e16,
          yard: value * 1.034e16,
          mileLand: value * 5.878e12,
          mileSea: value * 4.979e12,
          astroUnit: value * 63241.1,
          lightYear: value
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
    function handleChangeLengthUnits(event) {
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
      input.addEventListener("input", handleChangeLengthUnits);
    });