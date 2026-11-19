
const items = document.querySelectorAll(".gallery-item");
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let visibleItems = Array.from(items);

// Open lightbox
items.forEach((item) => {
    item.addEventListener("click", () => {
        visibleItems = Array.from(items).filter(
            element => element.style.display !== "none"
        );

        currentIndex = visibleItems.indexOf(item);
        showImage();
        lightbox.classList.add("show");
    });
});

// Display selected image
function showImage() {
    const item = visibleItems[currentIndex];
    const img = item.querySelector("img");

    lightboxImg.src = img.src;
    lightboxCaption.textContent = item.querySelector(".caption").textContent;
}

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage();
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    } else if (event.key === "ArrowLeft") {
        prevBtn.click();
    } else if (event.key === "Escape") {
        closeBtn.click();
    }
});

// Category filters
filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        const category = filter.dataset.category;

        filters.forEach(btn => btn.classList.remove("active"));
        filter.classList.add("active");

        items.forEach((item) => {
            const match =
                category === "all" ||
                item.dataset.category === category;

            item.style.display = match ? "block" : "none";
        });
    });
});
