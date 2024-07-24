chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ passwords: [] }, function () {
      console.log("Initialized password storage.");
    });
  });
  