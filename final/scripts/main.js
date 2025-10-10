import congratulations from './congratulations.js';
import cookies from './cookies.js';
import showDiscover from './discover.js';
import footer from './footer.js';
import navigation from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const pageName = document.title.split(' | ')[1];
  navigation(pageName);

  switch (pageName.toLowerCase()) {
    case 'congratulations':
      congratulations();
      break;
    case 'discover':
      showDiscover();
      break;

    default:
      break;
  }

  cookies()

  footer();
});
