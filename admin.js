// Global variable to store all pending offsetters for filtering
let allOffsetters = [];

// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchPendingOffsetters();

    // Attach search event listener
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterOffsetters);

    // Attach logout event listener
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', logout);
});

// Fetch all pending offsetters from the server
async function fetchPendingOffsetters() {
    try {
        const response = await fetch('https://re-api-topaz.vercel.app/pending-offsetters');
        if (!response.ok) throw new Error('Failed to fetch offsetters');

        allOffsetters = await response.json(); // Store the offsetters globally
        displayOffsetters(allOffsetters);
    } catch (error) {
        console.error('Error fetching pending offsetters:', error);
    }
}

// Display the list of offsetters
function displayOffsetters(offsetters) {
    const offsetterList = document.getElementById('offsetter-list');
    offsetterList.innerHTML = ''; // Clear the existing list

    offsetters.forEach(offsetter => {
        const card = createOffsetterCard(offsetter);
        offsetterList.appendChild(card);
    });
}

// Filter offsetters based on the search input
function filterOffsetters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredOffsetters = allOffsetters.filter(offsetter => {
        return (
            offsetter.name.toLowerCase().includes(searchTerm) ||
            offsetter.location.toLowerCase().includes(searchTerm) ||
            offsetter.offsetFocus.toLowerCase().includes(searchTerm)
        );
    });

    displayOffsetters(filteredOffsetters);
}

// Create a card for each offsetter
function createOffsetterCard(offsetter) {
    const card = document.createElement('div');
    card.className =
        'bg-white p-6 rounded-2xl shadow-lg transform transition hover:scale-105 hover:shadow-xl';

    card.innerHTML = `
        <h3 class="text-lg font-extrabold text-teal-700 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 18.364A9 9 0 0112 3m0 0a9 9 0 016.879 15.364M12 3v18" />
            </svg>
            ${offsetter.name}
        </h3>
        <p class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657A8 8 0 116.343 7.343 8 8 0 0117.657 16.657zM12 9v3m0 4h.01" />
            </svg>
            <strong>Location:</strong> ${offsetter.location}
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <strong>Focus:</strong> ${offsetter.offsetFocus}
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7z" />
            </svg>
            <strong>CO₂ Reduction Potential:</strong> ${offsetter.CO2ReductionPotential}
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-5-5 5-5m7-2h5m-7-4h7" />
            </svg>
            <strong>Website:</strong> <a href="${offsetter.website}" target="_blank" class="text-teal-500 underline hover:text-teal-700">${offsetter.website}</a>
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 9l4-4m0 0l-4-4m4 4H3" />
            </svg>
            <strong>Contact:</strong> ${offsetter.contact}
        </p>
    `;

    // Approve Button
    const approveButton = document.createElement('button');
    approveButton.className =
        'w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mb-2';
    approveButton.textContent = 'Approve';
    approveButton.addEventListener('click', () => approveOffsetter(offsetter._id));

    // Reject Button
    const rejectButton = document.createElement('button');
    rejectButton.className =
        'w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition';
    rejectButton.textContent = 'Reject';
    rejectButton.addEventListener('click', () => rejectOffsetter(offsetter._id));

    // Append buttons to the card
    card.appendChild(approveButton);
    card.appendChild(rejectButton);

    return card;
}

// Approve and reject functions remain unchanged...
// Logout function remains unchanged...
