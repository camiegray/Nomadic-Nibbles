
document.addEventListener('DOMContentLoaded', function() {
    const regionMapping = {
      "Asia": ["East Asia", "South Asia", "Southeast Asia", "Central Asia", "Western Asia"],
      "Europe": ["Northern Europe", "Southern Europe", "Eastern Europe", "Western Europe"],
      "Africa": ["North Africa", "Sub-Saharan Africa"],
      "Americas": ["North America", "South America", "Central America", "Caribbean"],
      "Oceania": ["Australia & New Zealand", "Melanesia", "Micronesia", "Polynesia"]
    };
  
    const majorRegionSelect = document.getElementById('majorRegion');
    const subRegionSelect = document.getElementById('subRegion');
  
    if (majorRegionSelect && subRegionSelect) {
      majorRegionSelect.addEventListener('change', function() {
        const selectedMajor = this.value;
        subRegionSelect.innerHTML = '<option value="">Select a subregion</option>';
        if (regionMapping[selectedMajor]) {
          regionMapping[selectedMajor].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            subRegionSelect.appendChild(option);
          });
        }
      });
    }
  });
  