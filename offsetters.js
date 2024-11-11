// Mock data for testing
const offsetters = [
    { name: "Green Earth Initiative", location: "Kenya", offsetFocus: "Forestry", CO2ReductionPotential: "30 tons per year" },
    { name: "Blue Planet Offset", location: "South Africa", offsetFocus: "Agriculture", CO2ReductionPotential: "50 tons per year" },
    { name: "Solar Energy Trust", location: "Rwanda", offsetFocus: "Renewable Energy", CO2ReductionPotential: "25 tons per year" }, 
    { name: "Eco forest alliance", location: "Kenya", offsetFocus: "Forestry", CO2ReductionPotential: "30 tons per year" },
    { name: "Ecoing Green", location: "South Africa", offsetFocus: "Agriculture", CO2ReductionPotential: "50 tons per year" },
    { name: "Dubai petroleum offsetters", location: "Rwanda", offsetFocus: "Renewable Energy", CO2ReductionPotential: "25 tons per year"},
    { name: "Green Earth Initiative", location: "Kenya", offsetFocus: "Forestry", CO2ReductionPotential: "30 tons per year" },
    { name: "Blue Planet Offset", location: "South Africa", offsetFocus: "Agriculture", CO2ReductionPotential: "50 tons per year" },
    { name: "Solar Energy Trust", location: "Rwanda", offsetFocus: "Renewable Energy", CO2ReductionPotential: "25 tons per year" }
     
];

const container = document.querySelector('.offsetters-container');

function displayOffsetters() {
    container.innerHTML = '';
    offsetters.forEach(offsetter => {
        const card = document.createElement('div');
        card.className = 'offsetter-card';
        card.innerHTML = `
            <h3>${offsetter.name}</h3>
            <p><strong>Location:</strong> ${offsetter.location}</p>
            <p><strong>Focus:</strong> ${offsetter.offsetFocus}</p>
            <p><strong>CO₂ Reduction:</strong> ${offsetter.CO2ReductionPotential}</p>
        `;
        container.appendChild(card);
    });
}

// Call function to load offsetters on page load
document.addEventListener('DOMContentLoaded', displayOffsetters);

