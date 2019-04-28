import { useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { UserInfo } from '../classes/UserInfo';

export function useUserInfoUpdateSubscription() {
  const forceUpdate = useForceUpdate();
  (() => {
    const updateSub = UserInfo.updateEvent.subscribe(forceUpdate);
    return () => updateSub.unsubscribe();
  }) |> useEffect(#, []);
}