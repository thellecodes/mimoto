chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "openPopup") {
            chrome.windows.create({'url': 'popup.html', 'type': 'popup', 'width': 400, 'height': 600}, function(window) {
            });
        }
    }
);
