
const images = [
    '../imgs/image1.jpg',
    '../imgs/image2.jpg',
    '../imgs/image3.jpg',
    '../imgs/image4.jpg',
    '../imgs/image5.jpg',
    '../imgs/image6.jpg',
];

async function fetchOffsetters() {
    try {
        const response = await fetch('http://127.0.0.1:5000/offsetters');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const offsetters = await response.json();
        displayOffsetters(offsetters);
    } catch (error) {
        console.error("Error fetching offsetters:", error);
    }
}

function displayOffsetters(offsetters) {
    const container = document.querySelector('.offsetters-container');
    container.innerHTML = ''; 

    offsetters.forEach((offsetter, index) => {      
        const imageUrl = images[index % images.length];    
        const card = document.createElement('div');
        card.className = 'offsetter-card';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${offsetter.name}" class="offsetter-image">
            <h3>${offsetter.name}</h3>
            <p><strong>Location:</strong> ${offsetter.location}</p>
            <p><strong>Focus:</strong> ${offsetter.offsetFocus}</p>
            <p><strong>CO₂ Reduction:</strong> ${offsetter.CO2ReductionPotential}</p>
        `;
        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', fetchOffsetters);
