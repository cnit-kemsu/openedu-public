import { Publisher } from '@kemsu/publisher';
import { setAuthHeader } from '@lib/client';

export class UserInfo {
  static updateEvent = new Publisher();

  static get role() {
    return localStorage.getItem('user.role');
  }
  static get email() {
    return localStorage.getItem('user.email');
  }
  static get verified() {
    return localStorage.getItem('user.verified');
  }
  static get complete() {
    return localStorage.getItem('user.complete');
  }
  static get bearer() {
    return localStorage.getItem('user.bearer');
  }
  static get pictureFileId() {
    return localStorage.getItem('user.pictureFileId');
  }
  static get isSignedIn() {
    return UserInfo.bearer !== undefined;
  }
  static get isStudent() {
    return UserInfo.role === 'student';
  }
  static get isAdmin() {
    return UserInfo.role === 'admin' || UserInfo.role === 'superuser';
  }
  static get isInstructor() {
    return UserInfo.role === 'instructor';
  }

  static update({ role, email, verified, complete, bearer, picture }) {
    if (role !== undefined) localStorage.setItem('user.role', role);
    if (email !== undefined) localStorage.setItem('user.email', email);
    if (verified !== undefined) localStorage.setItem('user.verified', verified);
    if (complete !== undefined) localStorage.setItem('user.complete', complete);
    if (bearer !== undefined) localStorage.setItem('user.bearer', bearer);
    if (picture !== undefined) {
      if (picture) localStorage.setItem('user.pictureFileId', picture.fileSourceKey);
      else localStorage.removeItem('user.pictureFileId');
    }
    setAuthHeader(bearer);
    UserInfo.updateEvent.publish();
  }

  static clear() {
    localStorage.removeItem('user.role');
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.verified');
    localStorage.removeItem('user.complete');
    localStorage.removeItem('user.bearer');
    localStorage.removeItem('user.pictureFileId');
    setAuthHeader(null);
    UserInfo.updateEvent.publish();
  }
}