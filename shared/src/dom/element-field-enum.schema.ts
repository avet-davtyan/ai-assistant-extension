import { z } from "zod";

export const ElementRole = z.enum([
  // Landmark roles
  "banner",
  "complementary",
  "contentinfo",
  "form",
  "main",
  "navigation",
  "region",
  "search",

  // Document structure
  "article",
  "columnheader",
  "definition",
  "directory",
  "document",
  "feed",
  "group",
  "heading",
  "img",
  "list",
  "listitem",
  "math",
  "note",
  "presentation",  // synonym: "none"
  "row",
  "rowgroup",
  "separator",
  "tooltip",

  // Widget roles
  "button",
  "checkbox",
  "combobox",
  "grid",
  "gridcell",
  "link",
  "listbox",
  "menu",
  "menubar",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "progressbar",
  "radio",
  "radiogroup",
  "scrollbar",
  "searchbox",
  "slider",
  "spinbutton",
  "status",
  "switch",
  "tab",
  "table",
  "tablist",
  "tabpanel",
  "textbox",
  "timer",
  "toolbar",
  "tree",
  "treegrid",
  "treeitem",

  // Live region roles
  "alert",
  "log",
  "marquee",
  "status", // appears twice, valid
  "timer",

  // Window roles
  "alertdialog",
  "dialog",
  "application"
]);

export const ElementType = z.enum([
  // <button> types
  "submit",
  "reset",
  "button",

  // <input> text-like
  "text",
  "password",
  "email",
  "search",
  "tel",
  "url",

  // <input> number/range
  "number",
  "range",

  // <input> date/time
  "date",
  "month",
  "week",
  "time",
  "datetime-local",

  // <input> selection
  "checkbox",
  "radio",

  // <input> file-related
  "file",
  "image",

  // other
  "color",
  "hidden"
]);

export type ElementTypeEnum = z.infer<typeof ElementType>;
export type ElementRoleEnum = z.infer<typeof ElementRole>;
