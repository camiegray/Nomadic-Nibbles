document.addEventListener('DOMContentLoaded', function() {
  var regionMapping = {
    "Asia": ["East Asia", "South Asia", "Southeast Asia", "Central Asia", "Western Asia"],
    "Europe": ["Northern Europe", "Southern Europe", "Eastern Europe", "Western Europe"],
    "Africa": ["North Africa", "Sub-Saharan Africa"],
    "Americas": ["North America", "South America", "Central America", "Caribbean"],
    "Oceania": ["Australia & New Zealand", "Melanesia", "Micronesia", "Polynesia"]
  };
  document.querySelectorAll('.region-dropdown').forEach(function(select) {
    var placeholder = select.getAttribute('data-placeholder');
    if (placeholder) {
      var opt = document.createElement('option');
      opt.value = "";
      opt.textContent = placeholder;
      opt.disabled = true;
      opt.selected = true;
      select.appendChild(opt);
    }
    Object.keys(regionMapping).forEach(function(key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      select.appendChild(opt);
    });
    select.addEventListener("change", function() {
      var dependent = document.querySelector(select.getAttribute('data-dependent'));
      if (dependent) {
        dependent.innerHTML = '<option value="">--Select--</option>';
        var subs = regionMapping[this.value];
        if (subs) {
          subs.forEach(function(sub) {
            var opt = document.createElement("option");
            opt.value = sub;
            opt.textContent = sub;
            dependent.appendChild(opt);
          });
        }
      }
    });
  });
});
