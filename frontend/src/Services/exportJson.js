/**
 * @file Utility functions for the data export
 * @author Ugo Balducci
 * @version 1.0.0
 */

/**
 * Exports the data to a JSON file
 * @param {Object} data The data to export
 * @param {String} name The name of the file
 * @return {void}
 */
const exportData = (data, name) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = name + ".json";

    link.click();
  };

export default exportData;