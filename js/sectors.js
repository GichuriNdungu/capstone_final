// Select all timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    // Add hover event listeners
    item.addEventListener('mouseenter', () => {
        const description = item.querySelector('.timeline-description');
        const descriptionText = item.getAttribute('data-description');
        const imageSrc = item.getAttribute('data-image'); // Get the image source for the description
        
        // Create an image element and set its source
        const imageElement = `<img src="${imageSrc}" alt="Description Image" class="description-img">`;
        
        // Set the description content with image and text
        description.innerHTML = `${imageElement}<p>${descriptionText}</p>`;
        
        // Show description, make it fill remaining width, and align height with the item
        description.style.display = 'block';
        description.style.width = `calc(100vw - ${item.offsetWidth}px - 40px)`; // Fill remaining width
        description.style.height = `${item.offsetHeight}px`; // Match height of the item
    });

    item.addEventListener('mouseleave', () => {
        const description = item.querySelector('.timeline-description');
        description.style.display = 'none';
    });
});