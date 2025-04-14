export const actionSchemas = [
  {
    name: "CLOSE_TABS",
    example: `{
    actionType: "CLOSE_TABS",
    actionData: {
      tabIds: number[]
    }
  }`,
  },
  {
    name: "OPEN_NEW_TAB",
    example: `{
    actionType: "OPEN_NEW_TAB",
    actionData: {
      url?: string
    }
  }`,
  },
  {
    name: "UPDATE_TAB",
    example: `{
    actionType: "UPDATE_TAB",
    actionData: {
      tabId: number,
      active?: boolean,
      autoDiscardable?: boolean,
      highlighted?: boolean,
      muted?: boolean,
      openerTabId?: number,
      pinned?: boolean,
      url?: string
    }
  }`,
  },
];
