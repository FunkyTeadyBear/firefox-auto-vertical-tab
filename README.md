# Firefox Auto Vertical Tab Toggle

Automatically enable (or disable) vertical tab if the width of your focused window is lower than or equal to (or higher than) a user defined threshold (1080 by default).

This is a Firefox ONLY extension built with [WXT](https://wxt.dev/).

Requires Firefox 142 or newer.

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

- You resize a page where content script cannot be loaded, e.g. `about:config`, _[restricted domains](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#restricted_domains)_. (Changing focus works correctly though)

  If you wish to help, please upvote this feature request in [this Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)!

## TODO

- Eliminate the need of content script once `windows.onBoundsChanged` is supported in Firefox. [(Bug 1762975)](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)
