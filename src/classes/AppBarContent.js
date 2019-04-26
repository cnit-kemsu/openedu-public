import { Publisher } from '@kemsu/publisher';

export class AppBarContent {
  static updateEvent = new Publisher();

  static content = undefined;

  static update(content) {
    if (AppBarContent.content !== content) {
      AppBarContent.content = content;
      AppBarContent.updateEvent.publish();
    }
  }

  constructor(forceUpdate) {
    this.forceUpdate = forceUpdate;
    this.handleUpdateEventSubscription = this.handleUpdateEventSubscription.bind(this);
  }

  handleUpdateEventSubscription() {
    const updateSub = AppBarContent.updateEvent.subscribe(this.forceUpdate);
    return () => updateSub.unsubscribe();
  }
}