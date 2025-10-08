import congratulations from './congratulations.js';
import showDiscover from './discover.js';
import footer from "./footer.js";
import navigation from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageName = document.title.split(" | ")[1];

  switch (pageName.toLowerCase()) {
    case 'congratulations':
      congratulations()
      break;
    case 'discover':
      showDiscover()
      break;
  
    default:
      break;
  }

  navigation(pageName);
  footer();
});
