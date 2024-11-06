const patternYoutube = /https:\/\/www\.youtube\.com\/watch\?v=[\w-]+/;
const patternYouCookie = /https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]+/;

browser.webNavigation.onBeforeNavigate.addListener((details) => {
    if (patternYouCookie.test(details.url) && details.url.includes('&')) {
        const newUrlCookie = details.url.split('&')[0];
        browser.tabs.update(details.tabId, { url: newUrlCookie });
    }
});

// Create a context menu item
browser.contextMenus.create({
    id: "open-with-youtube-adsless",
    title: "Open With Youtube Adsless",
    contexts: ["link"]
});

// Add a listener for the context menu click event
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-with-youtube-adsless" && info.linkUrl) {
        const url = info.linkUrl;

        if (patternYoutube.test(url)) {
            const newUrl = url.replace('youtube', 'yout-ube');
            browser.tabs.create({ url: newUrl });
        } else {
            browser.tabs.create({ url: url });
        }
    }
});