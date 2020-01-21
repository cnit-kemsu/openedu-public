import { useEffect } from 'react';
import { History } from '@kemsu/router';

export function useHistoryScrollPosition() {
  useEffect(() => {
    History.setBeforeRoute(
      () => {
        history.replaceState({ ...history.state, scrollPosition: window.pageYOffset }, document.title, location.href);
      }
    );
    // setTimeout(
    //   () => {
    //     if (history.state?.scrollPosition) window.scrollTo(0, history.state.scrollPosition);
    //   },
    //   1000
    // );
    return () => {
      History.setBeforeRoute(null);
    };
  }, []);
}