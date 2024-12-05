let burgerButton = document.getElementById("nav-burger-btn");
let navLabels = document.getElementsByClassName("nav-labels");

export function initNav(breakpoints) {
  burgerButton = document.getElementById("nav-burger-btn");
  navLabels = document.getElementsByClassName("nav-labels");
  burgerButton.addEventListener("click", toggleNavWidth);
  navEventListenerResize(breakpoints);
}

export function navEventListenerResize(breakpoints) {
  console.log(navLabels.length);
  if (navLabels.length > 0) {
    const currentWidth = document.documentElement.clientWidth;
    const isHidden = navLabels[0].classList.contains("hidden");
    const isDefault = currentWidth < breakpoints.sm;
    const isTablet = currentWidth < breakpoints.lg;
    const isDesktop = currentWidth > breakpoints.lg;
    if (isDefault) {
      console.log("test");
      showLabels();
    } else if (isTablet) {
      hideLabels();
    } else if (isDesktop) {
      showLabels();
    }
  }
}

export function hideLabels() {
  if (navLabels.length > 0) {
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

function toggleNavWidth() {
  const isHidden = navLabels[0].classList.contains("hidden");
  for (let label of navLabels) {
    if (isHidden) {
      label.classList.remove("hidden");
    } else {
      label.classList.add("hidden");
    }
  }
}
