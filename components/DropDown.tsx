import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useTranslations, useLocale } from "next-intl";
import { localeItems } from "@/navigation";
import local from "next/font/local";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type LanguageType =
  | "English"
  | "Español"
  | "Français"
  | "Deutsch"
  | "Italiano"
  | "Português"
  | "Pусский"
  | "हिन्दी"
  | "Tiếng Việ"
  | "한국어"
  | "日本語"
  | "中文(简体)";

interface DropDownProps {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

let languages: LanguageType[] = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "Italiano",
  "Português",
  "Pусский",
  "हिन्दी",
  "Tiếng Việ",
  "한국어",
  "日本語",
  "中文(简体)",
];

export default function DropDown({ language, setLanguage }: DropDownProps) {
  const locale = useLocale();
  const findItem = languages.find(
    (lang) => lang === localeItems.find((item) => item.code === locale)?.name
  );
  // console.log(`locale== ${locale}, findItem== ${findItem}`);
  if (findItem) {
    language = findItem;
  }
  setLanguage(language)
  return (
    <Menu as="div" className="relative block w-full text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {language}
          <ChevronUpIcon
            className="ui-open:hidden -mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="ui-open:block -mr-1 ml-2 hidden h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={language}
        >
          <div className="">
            {languages.map((languageItem) => (
              <Menu.Item key={languageItem}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(languageItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      language === languageItem ? "bg-gray-200" : "",
                      "flex w-full items-center justify-between space-x-2 px-4 py-2 text-left text-sm"
                    )}
                  >
                    <span>{languageItem}</span>
                    {language === languageItem ? (
                      <CheckIcon className="text-bold h-4 w-4" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
