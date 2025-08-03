# Firefox Auto Vertical Tab Toggle

This is a Firefox ONLY extension built with [WXT](https://wxt.dev/).

Requires Firefox 142 or newer.

This extension does not collect any data nor send any data to any server.

## Logic

Check window width when one of the following happens:

1. You change your focused Firefox window
2. You resize the currently focused window AND you are not on a page where content scripts cannot run

Then:

1. If window width <= user defined threshold, enable vertical tab
2. If window width > user defined threshold, disable vertical tab

The user defined threshold is 1080 (in pixels) by default.

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

## Limitation

This extension does not work correctly under these situations:

- You resize a Firefox window in a page where content script cannot be loaded, e.g. `about:config`, _[restricted domains](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#restricted_domains)_.

  (Changing focused window works correctly though)

  If you wish to help, please upvote this feature request in [this Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)!

## TODO

- Eliminate the need of content script once `windows.onBoundsChanged` is supported in Firefox. [(Bug 1762975)](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)
