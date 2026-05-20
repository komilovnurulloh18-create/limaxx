/* LIMAX Main Interactions */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const updateNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  if(loader){
    setTimeout(() => {
      loader.classList.add("hidden");
    },800);
  }
});

  const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach((item) => {
    const top = item.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      item.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll,{passive:true});

revealOnScroll();

  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    let value = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const tick = () => {
      value += step;
      if (value >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = value;
        requestAnimationFrame(tick);
      }
    };
    tick();
  });

  const searchInput = document.querySelector("#searchProducts");
const categorySelect = document.querySelector("#categoryFilter");
const cards = document.querySelectorAll(".product-card");

function filterCards() {
  const searchText = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const selectedCategory = categorySelect
    ? categorySelect.value.toLowerCase()
    : "all";

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const category = (card.dataset.category || "").toLowerCase();

    const searchMatch =
      searchText === "" ||
      title.includes(searchText);

    const categoryMatch =
      selectedCategory === "all" ||
      category === selectedCategory;

    if (searchMatch && categoryMatch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", filterCards);
}

if (categorySelect) {
  categorySelect.addEventListener("change", filterCards);
}

filterCards();  

 const menuToggle=document.querySelector("#menuToggle");
const mainNav=document.querySelector("#mainNav");
const menuClose=document.querySelector("#menuClose");

function openMenu(){
 if(!mainNav)return;

 mainNav.classList.add("open");
 document.body.classList.add("menu-open");
}

function closeMenu(){
 if(!mainNav)return;

 mainNav.classList.remove("open");
 document.body.classList.remove("menu-open");
}

if(menuToggle){

menuToggle.addEventListener("click",()=>{

if(mainNav.classList.contains("open")){
closeMenu();
}else{
openMenu();
}

});

}

if(menuClose){

menuClose.addEventListener("click",closeMenu);

}

document.querySelectorAll("#mainNav a")
.forEach(link=>{

link.addEventListener("click",()=>{

closeMenu();

})

});

window.addEventListener("resize",()=>{

if(window.innerWidth>768){

closeMenu();

}

});

  const sortProducts = document.querySelector("#sortProducts");
  const productsGrid = document.querySelector("#productsGrid");
  if (sortProducts && productsGrid) {
    sortProducts.addEventListener("change", () => {
      const items = [...productsGrid.querySelectorAll(".product-card")];
      const mode = sortProducts.value;
      items.sort((a, b) => {
        const pa = Number(a.dataset.price || 0);
        const pb = Number(b.dataset.price || 0);
        return mode === "low" ? pa - pb : mode === "high" ? pb - pa : 0;
      });
      items.forEach((item) => productsGrid.appendChild(item));
    });
  }

  const modal = document.querySelector("#productModal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalName = document.querySelector("#modalName");
  const modalYarn = document.querySelector("#modalYarn");
  const modalColor = document.querySelector("#modalColor");
  const modalAvailableColors = document.querySelector("#modalAvailableColors");
  const modalCode = document.querySelector("#modalCode");
  const modalQuality = document.querySelector("#modalQuality");
  const modalUsage = document.querySelector("#modalUsage");
  const modalMaterial = document.querySelector("#modalMaterial");
  const modalExtra = document.querySelector("#modalExtra");
  const modalMainImage = document.querySelector("#modalMainImage");
  const modalThumbs = document.querySelector("#modalThumbs");
  const closeModal = document.querySelector("#closeModal");

  const renderModalGallery = (images) => {
    if (!modalMainImage || !modalThumbs) return;
    modalThumbs.innerHTML = "";
    const safeImages = images.filter(Boolean);
    if (!safeImages.length) return;

    modalMainImage.src = safeImages[0];

    safeImages.forEach((imageUrl, index) => {
      const thumbButton = document.createElement("button");
      thumbButton.type = "button";
      thumbButton.setAttribute("aria-label", `Rasm ${index + 1}`);

      const thumbImage = document.createElement("img");
      thumbImage.src = imageUrl;
      thumbImage.alt = `Mahsulot rasmi ${index + 1}`;
      thumbButton.appendChild(thumbImage);

      thumbButton.addEventListener("click", () => {
        modalMainImage.src = imageUrl;
      });

      modalThumbs.appendChild(thumbButton);
    });
  };

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (modal) {
        const productName = btn.dataset.product || btn.dataset.title || "";
        const yarnType = btn.dataset.yarn || "-";
        const color = btn.dataset.color || "-";
        const code = btn.dataset.code || "-";
        const quality = btn.dataset.quality || "Premium";
        const usage = btn.dataset.usage || "-";
        const material = btn.dataset.material || "-";
        const extra = btn.dataset.extra || "-";
        const images = (btn.dataset.images || "").split(",");

        if (modalTitle) modalTitle.textContent = productName;
        if (modalName) modalName.textContent = productName;
        if (modalYarn) modalYarn.textContent = yarnType;
        if (modalColor) modalColor.textContent = color;
        if (modalAvailableColors) modalAvailableColors.textContent = color;
        if (modalCode) modalCode.textContent = code;
        if (modalQuality) modalQuality.textContent = quality;
        if (modalUsage) modalUsage.textContent = usage;
        if (modalMaterial) modalMaterial.textContent = material;
        if (modalExtra) modalExtra.textContent = extra;

        renderModalGallery(images);
        modal.classList.add("show");
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.classList.remove("show"));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.classList.remove("show");
    });
  }

  const orderPopup = document.querySelector("#orderPopup");
  const closeOrderPopup = document.querySelector("#closeOrderPopup");
  document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (orderPopup) orderPopup.classList.add("show");
    });
  });
  if (closeOrderPopup && orderPopup) {
    closeOrderPopup.addEventListener("click", () =>
      orderPopup.classList.remove("show"),
    );
    orderPopup.addEventListener("click", (event) => {
      if (event.target === orderPopup) orderPopup.classList.remove("show");
    });
  }
});
