import { Publisher } from '@kemsu/publisher';

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
  static get bearer() {
    return localStorage.getItem('user.bearer');
  }

  static update({ role, email, verified, bearer }) {
    if (role !== undefined) localStorage.setItem('user.role', role);
    if (email !== undefined) localStorage.setItem('user.email', email);
    if (verified !== undefined) localStorage.setItem('user.verified', verified);
    if (bearer !== undefined) localStorage.setItem('user.bearer', bearer);
    UserInfo.updateEvent.publish();
  }

  static clear() {
    localStorage.removeItem('user.role');
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.verified');
    localStorage.removeItem('user.bearer');
    UserInfo.updateEvent.publish();
  }
}