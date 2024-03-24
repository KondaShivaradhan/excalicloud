import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://excalidraw.com/*"],
  all_frames: true
}
window.addEventListener("load", () => {
  console.log(
    "Excali Cloud is injected!"
  )
 
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Set LocalStorage
    if (message.action === "triggerContentScript") {
      // Execute the desired action in the content script
      console.log("Content script triggered");
      const parameterValue =JSON.parse( message.parameter).data;
      console.log(parameterValue);
      for (const key in parameterValue ) {
        if (parameterValue.hasOwnProperty(key)) {
          console.log("Changing ",key," with ",parameterValue[key]);
          
          localStorage.setItem(key, parameterValue[key]);
        }
      }
      const hostLocalStorage = window.localStorage;
      console.log(hostLocalStorage);

      sendResponse("Changed")
      window.location.reload();
    }
    // fetchLocalStorage

    if (message.action === 'getLocalStorageData') {
      const hostLocalStorage = window.localStorage;
      console.log(hostLocalStorage);
      
      sendResponse({ data: localStorage });
      // FetchCanvas(message)
      // chrome.runtime.sendMessage({
      //   action: 'getLocalStorageData',
      //   data: hostLocalStorage
      // });
    }
  });

})
/**
 * Funtion to fetch the localstorage of the current tab.
 * @param message 
 */
function FetchCanvas(message) {
  // Send localStorage data to the popup or options page
  chrome.runtime.sendMessage({
    action: 'getLocalStorageData',
    data: message.data
  });
}