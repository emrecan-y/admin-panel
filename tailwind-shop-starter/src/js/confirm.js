export function initConfirm(actionMsg, x, y, yesBtnFnc, noBtnFnc) {
  // limit to single concurrent popup
  if (popupIsLoaded()) {
    return;
  }
  const template = `
    <div id="confirm-popup-background" class="w-screen h-screen fixed top-0 left-0 z-20"></div>
    <div id="confirm-popup-arrow" class="w-0 h-0 border-t-[0px] border-b-[10px] border-r-[15px] border-transparent border-r-accent-dark z-20"></div>
    <div class="grid h-min w-max grid-cols-2 bg-nav p-1 text-md  border-2 border-accent-dark z-20">
        <p class="col-span-2 text-center animate-bounce ">
        ${actionMsg}
        </p>
        <button id="confirm-popup-yes-btn" class=" hover:bg-accent-dark bg-table-dark p-0.5 " >Ja</button>
        <button id="confirm-popup-no-btn"  class="hover:bg-accent-dark bg-table-dark p-0.5 ml-1">Nein</button>
    </div>
`;

  const confimPopup = document.createElement("div");
  confimPopup.id = "confirm-popup";
  confimPopup.style.display = "flex";
  confimPopup.innerHTML = template;
  confimPopup.style.position = "absolute";
  confimPopup.style.left = x + "px";
  confimPopup.style.top = y + "px";

  document.body.insertAdjacentElement("beforeend", confimPopup);

  if (noBtnFnc == null) {
    noBtnFnc = removePopup;
  }
  initButtons(yesBtnFnc, noBtnFnc);
}

export function removePopup() {
  if (popupIsLoaded) {
    document.getElementById("confirm-popup").remove();
  }
}

function initButtons(yesBtnFnc, noBtnFnc) {
  const yesBtn = document.getElementById("confirm-popup-yes-btn");
  yesBtn.addEventListener("click", yesBtnFnc);
  yesBtn.addEventListener("click", removePopup);

  const noBtn = document.getElementById("confirm-popup-no-btn");
  noBtn.addEventListener("click", noBtnFnc);
  noBtn.addEventListener("click", removePopup);

  document
    .getElementById("confirm-popup-background")
    .addEventListener("click", removePopup);
}

function popupIsLoaded() {
  if (document.getElementById("confirm-popup") == null) {
    return false;
  } else {
    return true;
  }
}
