import { History, Location } from '@kemsu/router';

export function changeOffset(offset) {
  History.push(Location.path, {
    ...Location.search,
    offset
  });
}

export function adjustOffset(count, offset, limit) {
  if (count === undefined) return;
  if (offset >= count) {
    const _offset = count - limit;
    History.update(Location.path, {
      ...Location.search,
      offset: _offset > 0 ? _offset : 0
    });
  }
}