export const accountInfo = { current: null };
export function updateAccountInfo() {
  if (accountInfo.current !== null) accountInfo.current.forceUpdate();
}