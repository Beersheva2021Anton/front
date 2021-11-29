const thumbnails = document.querySelectorAll('.thumbnails-anchor');
const detailedImage = document.querySelector('.details-image');
const detailedTitle = document.querySelector('.details-title');
const mainContent = document.querySelector('.main-class');
const HIDDEN = 'hidden';
const SELECTED = 'selected';
let selectedItem = thumbnails[0].parentElement;

thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener("click", function(event) {
        event.preventDefault();
        showDetails();
        setDetails(thumbnail);
        selectItem(thumbnail);
    });
});

function setDetails(thumbnail) {
    detailedImage.src = thumbnail.href;
    detailedTitle.innerHTML = thumbnail.getAttribute('data-detailed-title');
}

function showDetails() {
    mainContent.classList.remove(HIDDEN);
}

function hideDetails() {
    mainContent.classList.add(HIDDEN);
    selectedItem.classList.remove(SELECTED);
}

const selectItem = thumbnail => {
    selectedItem.classList.remove(SELECTED);
    selectedItem = thumbnail.parentElement;
    selectedItem.classList.add(SELECTED);
}