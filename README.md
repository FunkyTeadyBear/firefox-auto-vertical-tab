# Firefox Auto Vertical Tab Toggle

Automatically toggle vertical tab if the width of your focused window is lower than a user defined threshold. (1080 by default)

This is a Firefox ONLY extension built with [WXT](https://wxt.dev/).

Requires Firefox 142 or newer.

## Build

```bash
npm install
npm run zip:firefox
```

## Limitation

This extension does not work if:

- You resize a page where content script cannot be loaded, e.g. `about:config`. (Changing focus works correctly though)

Other limitation:

- A message is generated per Firefox window after the automatic toggle. This MIGHT slow down your PC if you have a lot of windows (not tabs) open.

## TODO

- Eliminate the need of content script once `windows.onBoundsChanged` is supported in Firefox. [(Bug 1762975)](https://bugzilla.mozilla.org/show_bug.cgi?id=1762975)
