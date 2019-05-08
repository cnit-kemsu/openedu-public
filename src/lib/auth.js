import { UserInfo } from './UserInfo';

const rolesAllowedToAdmin = ['admin', 'superuser'];

export function allowedToAdmin() {
  return rolesAllowedToAdmin.includes(UserInfo.role);
}