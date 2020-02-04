// translationRunner.js
const manageTranslations = require('react-intl-translations-manager').default;

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: 'build/messages/src/extracted/',
  translationsDirectory: 'src/translations/locales/',
  languages: ['en', 'zh-CN'] // any language you need
});
