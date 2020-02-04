import { addLocale, useLocale } from 'ttag';
import { getLocale } from 'umi-plugin-react/locale';
import zh from '../i18n/zh-CN.json';
import en from '../i18n/en.json';

export function setupi18n() {
  const locale = getLocale();
  console.log('setupi18n', locale);
  if (locale === 'zh-CN') {
    addLocale(locale, zh);
  } else {
    addLocale(locale, en);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLocale(locale);
}
