// The first event our service worker will listen for is runtime.onInstalled(). 
// This method allows the extension to set an initial state or complete some tasks on installation. 
// Extensions can use the Storage API and IndexedDB to store the application state. 
// In this case, though, since we're only handling two states, we will use the action's badge text itself to track whether the extension is 'ON' or 'OFF'.
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
});


// After the user clicks the extension action, the extension will check if the URL matches a documentation page. 
// Next, it will check the state of the current tab and set the next state. Add the following code to background.js:
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      });
    } else if (nextState === 'OFF') {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      });
    }
  }
});