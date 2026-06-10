document.addEventListener("DOMContentLoaded", () => {
  const menuSection = document.querySelector(".menu");
  const aboutSection = document.querySelector(".about-us");
  const footerSection = document.querySelector("footer");
  const menuButtons = Array.from(document.querySelectorAll(".menu-nav-bar .menu-item"));
  const menuItems = Array.from(document.querySelectorAll(".menu-container .item"));
  const heroMenuBtn = document.getElementById("menu-btn");
  const heroStoryBtn = document.getElementById("story-btn");
  const navLinks = Array.from(document.querySelectorAll("#navbar a"));
  const navbar = document.getElementById("navbar");

  const categoryMap = {
    drinks: ["espresso", "latte", "cappucino", "matcha", "tea", "macchiato", "coffee"],
    bakeries: ["cake", "cheesecake", "ekler", "biscuit", "pastry", "croissant"],
  };

  const getMenuItemCategory = (itemName) => {
    const normalized = itemName.toLowerCase();
    if (categoryMap.bakeries.some((term) => normalized.includes(term))) {
      return "bakeries";
    }
    if (categoryMap.drinks.some((term) => normalized.includes(term))) {
      return "drinks";
    }
    return "all";
  };

  const setMenuItemCategories = () => {
    menuItems.forEach((item) => {
      const nameElement = item.querySelector(".item-name");
      const name = nameElement ? nameElement.textContent.trim() : "";
      const category = getMenuItemCategory(name);
      item.dataset.category = category;
    });
  };

  const updateFilterButtons = (activeKey) => {
    menuButtons.forEach((button) => {
      const buttonText = button.textContent.trim().toLowerCase();
      const isActive = buttonText === activeKey || (activeKey === "all" && buttonText === "all");
      button.classList.toggle("active", isActive);
    });
  };

  const filterMenu = (category) => {
    menuItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === "all" || itemCategory === category;
      item.style.display = shouldShow ? "flex" : "none";
    });
    updateFilterButtons(category);
  };

  const smoothScrollTo = (target) => {
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (event) => {
    event.preventDefault();
    const text = event.currentTarget.textContent.trim().toLowerCase();
    if (text.includes("menu")) {
      smoothScrollTo(menuSection);
    } else if (text.includes("about")) {
      smoothScrollTo(aboutSection);
    } else if (text.includes("find")) {
      smoothScrollTo(footerSection);
    }
  };

  const handleScroll = () => {
    const threshold = 20;
    navbar.classList.toggle("scrolled", window.scrollY > threshold);
  };

  setMenuItemCategories();
  filterMenu("all");

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.textContent.trim().toLowerCase();
      const filterKey = key === "drinks☕" ? "drinks" : key === "bakeries🥐" ? "bakeries" : "all";
      filterMenu(filterKey);
    });
  });

  if (heroMenuBtn) {
    heroMenuBtn.addEventListener("click", () => smoothScrollTo(menuSection));
  }

  if (heroStoryBtn) {
    heroStoryBtn.addEventListener("click", () => smoothScrollTo(aboutSection));
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
