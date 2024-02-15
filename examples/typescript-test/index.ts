import { Region, screen } from "@nut-tree/nut-js";

(async () => {
  await screen.highlight(new Region(100, 200, 300, 400));
})();
