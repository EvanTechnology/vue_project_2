import store from "../store";
import ru from "../locales/ru.json";
import en from "../locales/en.json";
const locales = {
  "en-AU": en,
  "ru-RU": ru
};
export default function localizeFilter(key) {
  const locale = store.getters.info.locale || "en-AU";
  return locales[locale][key] || `[Localize error]: key ${key} did not find`;
}
