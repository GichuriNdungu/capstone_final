let allOffsetters = []; // Store all pending offsetters for filtering

document.addEventListener('DOMContentLoaded', () => {
    fetchPendingOffsetters();

    // Attach search event listener
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterOffsetters);
});

// Fetch and display all pending offsetters
async function fetchPendingOffsetters() {
    try {
        const response = await fetch('http://127.0.0.1:5000/pending-offsetters');
        allOffsetters = await response.json(); // Store all offsetters in a global variable

        displayOffsetters(allOffsetters);
    } catch (error) {
        console.error('Error fetching pending offsetters:', error);
    }
}

// Display offsetters on the page
function displayOffsetters(offsetters) {
    const offsetterList = document.getElementById('offsetter-list');
    offsetterList.innerHTML = ''; // Clear the container

    offsetters.forEach(offsetter => {
        const card = createOffsetterCard(offsetter);
        offsetterList.appendChild(card);
    });
}

// Filter offsetters based on search input
function filterOffsetters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredOffsetters = allOffsetters.filter(offsetter => {
        return (
            offsetter.name.toLowerCase().includes(searchTerm) ||
            offsetter.location.toLowerCase().includes(searchTerm) ||
            offsetter.offsetFocus.toLowerCase().includes(searchTerm)
        );
    });

    displayOffsetters(filteredOffsetters); // Update the display with filtered results
}

// Create an offsetter card
function createOffsetterCard(offsetter) {
    const card = document.createElement('div');
    card.className = 'offsetter-card';

    card.innerHTML = `
        <h3>${offsetter.name}</h3>
        <p><strong>Location:</strong> ${offsetter.location}</p>
        <p><strong>Focus:</strong> ${offsetter.offsetFocus}</p>
        <p><strong>CO₂ Reduction Potential:</strong> ${offsetter.CO2ReductionPotential}</p>
        <p><strong>website:</strong> ${offsetter.website}</p>
        <p><strong>Contact:</strong> ${offsetter.contact}</p>
    `;

    const approveButton = document.createElement('button');
    approveButton.className = 'approve';
    approveButton.textContent = 'Approve';
    approveButton.addEventListener('click', () => approveOffsetter(offsetter._id));

    const rejectButton = document.createElement('button');
    rejectButton.className = 'reject';
    rejectButton.textContent = 'Reject';
    rejectButton.addEventListener('click', () => rejectOffsetter(offsetter._id));

    card.appendChild(approveButton);
    card.appendChild(rejectButton);

    return card;
}

// Approve an offsetter
async function approveOffsetter(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/approve-offsetter/${id}`, {
            method: 'POST',
        });

        if (response.ok) {
            alert('Offsetter approved successfully!');
            fetchPendingOffsetters(); // Refresh the list
        } else {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error approving offsetter:', error);
    }
}

// Reject an offsetter
async function rejectOffsetter(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/reject-offsetter/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Offsetter rejected successfully!');
            fetchPendingOffsetters(); // Refresh the list
        } else {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error rejecting offsetter:', error);
    }
}