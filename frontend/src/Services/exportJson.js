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