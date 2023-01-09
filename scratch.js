const { sleep, screen, windowWithTitle, getWindows } = require("./dist");

(async () => {
  await sleep(3000);
  const allWindows = await getWindows();
  const allTitles = await Promise.all(allWindows.map((wnd) => wnd.title));
  console.log(allTitles);
  const wnd = await screen.find(windowWithTitle(/.*nut.js.*/));
  await screen.highlight(wnd.region);
})();
