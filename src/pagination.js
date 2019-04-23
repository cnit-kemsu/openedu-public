import { History, Location } from '@kemsu/router';

export function changeOffset(offset) {
  History.push(Location.path, {
    ...Location.search,
    offset
  });
}