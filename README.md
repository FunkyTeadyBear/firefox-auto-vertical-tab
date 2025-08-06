# Firefox Auto Vertical Tab Toggle

This is a Firefox ONLY extension built with [WXT](https://wxt.dev/).

Requires Firefox 142 or newer.

This extension does not collect any data nor send any data to any server.

## Logic

Check the width of currently focused Firefox window periodically (every 0.1 second):

1. If width <= user defined threshold, enable vertical tab
2. If width > user defined threshold, disable vertical tab

The user defined threshold is 1080 (in pixels) by default.
You can edit this value in the extension popup menu.

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

- Write Playwright tests once Firefox 142 is generally available
- Rewrite once `windows.onBoundsChanged` is supported in Firefox. [(Bug 1762975)](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)
