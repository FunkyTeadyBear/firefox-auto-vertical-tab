# Firefox Auto Vertical Tab Toggle

<video src="https://github.com/user-attachments/assets/cc06ef4b-3996-448d-827a-85216857767d"  controls></video>

This is a Firefox ONLY extension built with [WXT](https://wxt.dev/).

Requires Firefox 142 or newer.

This extension does not collect any data nor send any data to any server.

## Logic

Check the width of currently focused Firefox window periodically (every 0.1 second):

1. If width <= user defined threshold, enable vertical tab
2. If width > user defined threshold, disable vertical tab

The user defined threshold is 1080 (in pixels) by default.

You may also choose to reverse the behavior, so that vertical tab is enabled when the window width is above the threshold (and vice versa).

You can edit the settings in the extension popup menu.

## Why use an interval instead of an onresize event?

`windows.onresize` event indeed is the most obvious solution to the problem.

However, I can only use it in content scripts, which does not work in *privileged* domains (e.g. `about:config`, [mozilla domains](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#restricted_domains)).

In addition, with content script, the extension would need access to all domains. This might scare away some users.

Weighting these points, I decided to use an interval in a background script instead. 10 checks per second is not that of a big deal for modern PC anyway.

In fact, there IS a `windows.onBoundsChanged` API ([MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/onBoundsChanged)) that can work in background script. The problem is that Firefox didn't implement it (lol).

Please leave a comment in this [bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975) to nudge them to implement it. In the meantime, please also upvote this [per-window vertical tab setting feature request](https://connect.mozilla.org/t5/ideas/vertical-tabs-per-window/idi-p/94064).

## Build

### Environment

- Fedora 42 KDE
- Firefox Developer Edition (142.0b5)
- Node.js 22.17.1

### Instructions

```bash
npm install
npm run zip
```

## TODO

- Write Playwright tests

## Attribution

The app icon (created by Smashicons) is downloaded from [flaticon.com](https://www.flaticon.com/free-icon/network_660484) for free.
