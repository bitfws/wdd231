import footer from "./footer.js";
import navigation from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageName = document.title.split(" | ")[1];

  navigation(pageName);
  footer();
});
