// Array of local image paths
const images = [
    '/imgs/image1.jpg',
    '/imgs/image2.jpg',
    '/imgs/image3.jpg',
    '/imgs/image4.jpg',
    '/imgs/image5.jpg',
    '/imgs/image6.jpg',
];

// Fetch offsetters data from the backend API
async function fetchOffsetters() {
    try {
        const response = await fetch('http://127.0.0.1:5000/offsetters'); // Update to deployed URL when hosted
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const offsetters = await response.json();
        displayOffsetters(offsetters);
    } catch (error) {
        console.error("Error fetching offsetters:", error);
    }
}

// Display offsetters in the container
function displayOffsetters(offsetters) {
    const container = document.querySelector('.offsetters-container');
    container.innerHTML = ''; // Clear any existing content

    offsetters.forEach((offsetter, index) => {
        // Use a different image for each card by cycling through the array
        const imageUrl = images[index % images.length];

        // Create a card for each offsetter
        const card = document.createElement('div');
        card.className = 'offsetter-card';

        // Populate the card with offsetter data, including an image at the top
        card.innerHTML = `
            <img src="${imageUrl}" alt="${offsetter.name}" class="offsetter-image">
            <h3>${offsetter.name}</h3>
            <p><strong>Location:</strong> ${offsetter.location}</p>
            <p><strong>Focus:</strong> ${offsetter.offsetFocus}</p>
            <p><strong>CO₂ Reduction:</strong> ${offsetter.CO2ReductionPotential}</p>
        `;

        // Append the card to the container
        container.appendChild(card);
    });
}

// Call fetchOffsetters on page load
document.addEventListener('DOMContentLoaded', fetchOffsetters);
