let navLabels = document.getElementsByClassName("nav-labels");
let navToggleUserOverride = false;

export function initNav(initNavProps) {
  const burgerButton = document.getElementById("nav-burger-btn");
  burgerButton.addEventListener("click", burgerButtonEventListener);

  const userButton = document.getElementById("nav-user-btn");
  userButton.addEventListener("click", initNavProps.injectUserView);

  const dashboardButton = document.getElementById("nav-dashboard-btn");
  dashboardButton.addEventListener("click", initNavProps.injectDashboard);

  const productAddButton = document.getElementById("nav-product-add-btn");
  productAddButton.addEventListener(
    "click",
    initNavProps.injectProductCreationView,
  );

  const productShowButton = document.getElementById("nav-product-show-btn");
  productShowButton.addEventListener("click", initNavProps.injectProductList);

  navLabels = document.getElementsByClassName("nav-labels");
  navEventListenerResize(initNavProps.breakpoints);
}

export function navEventListenerResize(breakpoints) {
  if (navLabels.length > 0) {
    const currentWidth = document.documentElement.clientWidth;
    const isDefault = currentWidth < breakpoints.sm;
    const isTablet = currentWidth < breakpoints.lg;
    const isDesktop = currentWidth > breakpoints.lg;
    if (isDefault) {
      navToggleUserOverride = false;
      showLabels();
    } else if (isTablet) {
      navToggleUserOverride = false;
      hideLabels();
    }
  }
}

export function hideLabels() {
  if (navLabels.length > 0 && !navToggleUserOverride) {
    for (let label of navLabels) {
      label.classList.add("hidden");
    }
  }
}

export function showLabels() {
  if (navLabels.length > 0) {
    for (let label of navLabels) {
      label.classList.remove("hidden");
    }
  }
}

function burgerButtonEventListener() {
  if (!navLabels[0].classList.contains("hidden")) {
    navToggleUserOverride = false;
    hideLabels();
  } else {
    navToggleUserOverride = true;
    showLabels();
  }
}
