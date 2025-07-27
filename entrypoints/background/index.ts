export default defineBackground({
  // Set manifest options
  persistent: false,
  type: "module",

  // Executed when background is loaded, CANNOT BE ASYNC
  main() {
    console.log("hi");

    browser.windows.onBoundsChanged.addListener((window) => {
      console.log(window.width);
      console.log(window.height);
    });
  },
});
