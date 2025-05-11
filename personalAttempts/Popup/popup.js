document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const position = document.querySelector('input[placeholder="Entry Level Software Engineer"]').value;
    const company = document.querySelector('input[placeholder="Google"]').value;
    const location = document.querySelector('input[placeholder="San Francisco, CA"]').value;
    const jobType = document.querySelector('input[placeholder="Full-Time"]').value;
  
    const jobData = {
      position,
      company,
      location,
      jobType,
      createdAt: new Date().toISOString()
    };
  
    // Store locally w/ Chrome extension local storage
    // run in chrome dev tools: chrome.storage.local.get("jobEntries", console.log);
    chrome.storage.local.get({ jobEntries: [] }, (result) => {
      const updated = [...result.jobEntries, jobData];
      chrome.storage.local.set({ jobEntries: updated }, () => {
        alert('Job entry saved locally!');
      });
    });
  
    
});