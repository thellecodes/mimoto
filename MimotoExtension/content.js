function addCustomIcon() {
  const placesSelectors = [
    'div.r-dnmrzs.r-1ny4l3l',
    '.r-gtdqiz .css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci',
    '.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci'
  ];
  
  placesSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(div => {
      if (div.matches('.css-1dbjc4n.r-xoduu5.r-1wbh5a2.r-dnmrzs.r-1ny4l3l')) {
        return;
      }

      const displayNameElement = Array.from(div.querySelectorAll('.r-9ilb82, .r-14j79pv, .r-rjixqe, .r-1vr29t4'))
        .find(x => x.textContent && x.textContent[0] !== '@');

        if (displayNameElement && !div.querySelector('.custom-icon')) {
          const customIcon = document.createElement('div');
          customIcon.className = 'custom-icon';
          const imagePath = chrome.runtime.getURL('images/Mimoto_bg_blue.png');
          customIcon.innerHTML = `<img src="${imagePath}" alt="Magnifying Glass" style="width:16px;height:16px;">`;
          customIcon.style.marginLeft = '4px';
  
          displayNameElement.insertAdjacentElement('afterend', customIcon);
        }
    });
  });
}

function attachPopupToMagnifyingGlass() {
  const magnifyingGlassSelector = '.custom-icon img';

  document.querySelectorAll(magnifyingGlassSelector).forEach(magnifyingGlass => {
      if (!magnifyingGlass.classList.contains('event-listener-attached')) {
          magnifyingGlass.addEventListener('click', (event) => {
              event.preventDefault();
              event.stopPropagation();
              window.open('http://localhost:3000/pay/nkoorty', '_blank');
          });
          magnifyingGlass.classList.add('event-listener-attached');
      }
  });
}


function observeDOMChanges() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        addCustomIcon();
        setTimeout(() => attachPopupToMagnifyingGlass(), 500); // Delay to ensure elements are loaded
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
  });
}

window.onload = function() {
  addCustomIcon();
  observeDOMChanges();
  setTimeout(() => attachPopupToMagnifyingGlass(), 500); // Delay to ensure elements are loaded
};