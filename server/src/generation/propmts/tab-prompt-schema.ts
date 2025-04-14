export const tabSchemas = [
  {
    name: "REGULAR_TAB",
    example: `{
    tabId: number,
    tabType: "REGULAR_TAB",
    tabData: {
      url: string,
      title: string,
      description: string,
      textSnippet: string
    }
  }`,
  },
  {
    name: "SYSTEM_TAB",
    example: `{
    tabId: number,
    tabType: "SYSTEM_TAB",
    tabData: {
      url: string
    }
  }`,
  },
];
