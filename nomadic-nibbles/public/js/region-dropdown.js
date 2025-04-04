document.addEventListener("DOMContentLoaded", function() {
  var regionMapping = {
    "Asia": ["East Asia", "South Asia", "Southeast Asia", "Middle East", "Central Asia", "Western Asia"],
    "Europe": ["Northern Europe", "Southern Europe", "Eastern Europe", "Western Europe"],
    "Africa": ["North Africa", "Sub-Saharan Africa", "West Africa", "East AFrica"],
    "Americas": ["North America", "South America", "Central America", "Caribbean"],
    "Oceania": ["Australia & New Zealand", "Melanesia", "Micronesia", "Polynesia"]
  };
  document.querySelectorAll("select[data-dependent]").forEach(function(select) {
    var dependentSelector = select.getAttribute("data-dependent");
    var dependent = document.querySelector(dependentSelector);
    if (select.options.length === 0) {
      var defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "--Select--";
      select.appendChild(defaultOption);
      Object.keys(regionMapping).forEach(function(key) {
        var option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
      });
    }
    select.addEventListener("change", function() {
      if (dependent) {
        dependent.innerHTML = "";
        var defOpt = document.createElement("option");
        defOpt.value = "";
        defOpt.textContent = "--Select--";
        dependent.appendChild(defOpt);
        var subs = regionMapping[this.value] || [];
        subs.forEach(function(sub) {
          var opt = document.createElement("option");
          opt.value = sub;
          opt.textContent = sub;
          dependent.appendChild(opt);
        });
      }
    });
  });
});
