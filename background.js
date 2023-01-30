(function () {
    'use strict';

    // https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ModifyHeaderInfo
    // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/HzEO5vnyocc
    // https://stackoverflow.com/questions/68422688/chrome-extension-declarativenetrequest-isnt-matching-rulecondition
    // const HEADERS_TO_STRIP_LOWERCASE = [
    //     'content-security-policy',
    //     'x-frame-options',
    //     'frame-options'
    // ];
    //
    // const extraInfoSpec = ["blocking", "responseHeaders"];
    // if (chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS) {
    //   extraInfoSpec.push(chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS)
    // }
    //
    // chrome.webRequest.onHeadersReceived.addListener(async function (details) {
    //   if (details.tabId !== -1 && details.initiator !== `chrome-extension://${(await chrome.management.getSelf()).id}`)
    //   if (details.initiator !== `chrome-extension://${self.id}` && details.tabId !== -1) {
    //     return {responseHeaders: details.responseHeaders} 
    //   }
    //   return {
    //       responseHeaders: details.responseHeaders.filter(function(header) {
    //           return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
    //       })
    //   };
    // }, {
    //   urls: ["<all_urls>"]
    // }, extraInfoSpec);
    //
    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(console.log);
    chrome.runtime.onInstalled.addListener(function () {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [{
                    id: 1,
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        responseHeaders: [
                            {
                                header: "content-security-policy",
                                operation: "remove"
                            },
                            {
                                header: "x-frame-options",
                                operation: "remove"
                            },
                            {
                                header: "frame-options",
                                operation: "remove"
                            }
                        ]
                    },
                    condition: {
                        initiatorDomains: [chrome.runtime.id],
                        resourceTypes: [
                            "sub_frame"
                        ]
                    }
                }]
        });
    });

}());
