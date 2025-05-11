document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const jobData = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        jobType: document.getElementById('jobType').value,
        createdAt: new Date().toISOString()
    };
  
    // Store locally w/ Chrome extension local storage
    // run in chrome dev tools: chrome.storage.local.get("jobEntries", console.log);
    chrome.storage.local.get({ jobEntries: [] }, (result) => {
      const updated = [...result.jobEntries, jobData];
      chrome.storage.local.set({ jobEntries: updated }, () => {
        // Switch UI to confirmation screen
        document.getElementById('form-section').classList.add('hidden');
        document.getElementById('confirmation-section').classList.remove('hidden');
      });
    });
});

// Close and History button functionality
document.getElementById('close-btn').addEventListener('click', () => {
    window.close(); // closes the popup
});

document.getElementById('history-btn').addEventListener('click', () => {
chrome.tabs.create({ url: 'https://www.google.com' }); // placeholder
});