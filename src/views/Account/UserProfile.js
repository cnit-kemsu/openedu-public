import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useQuery, Mutation, refetch } from '@kemsu/graphql-client';
import { History } from '@kemsu/router';
import { Loader, Form, Notifications } from '@kemsu/core';
import { useForm } from '@kemsu/form';
import { TextField, DragAndDropImageDialog } from '@kemsu/inputs';
import { validateFirstname, validateLastname } from '@lib/validate';
import { UserInfo } from '@lib/UserInfo';
import { updateAccountInfo } from '@components/updateAccountInfo';
import RouteBackBtn from '@components/RouteBackBtn';
import { UserProfileData as useUserProfileDataStyles, EditUserProfile as useEditUserProfileStyles, EditUserProfileForm as useEditUserProfileFormStyles } from './styles';

const USER_PROFILE = () => `
  userProfile {
    email
    role
    firstname
    lastname
    middlename
    picture
  }
`;

const UPDATE_PROFILE = ({
  firstname = 'String',
  lastname = 'String',
  middlename = 'String',
  picture = 'JSON'
}) => `
  updateUserProfile(
    firstname: ${firstname}
    lastname: ${lastname}
    middlename: ${middlename}
    picture: ${picture}
  ) {
    picture
  }
`;
function onComplete({ updateUserProfile: { picture } = {} }) {
  Notifications.push('Профиль пользователя был успешно создан.', 'success');
  History.push('/account/profile');
  UserInfo.update({ picture });
  refetch(USER_PROFILE);
  updateAccountInfo();
}
const updateUserProfile = new Mutation(UPDATE_PROFILE, { onComplete }).commit;

const roleMap = {
  'SUPERUSER': 'Главный администратор',
  'ADMIN': 'администратор',
  'INSTRUCTOR': 'Преподаватель'
};

function diplayRole(role) {
  if (role === 'STUDENT') return null;
  return <Typography>{roleMap[role]}</Typography>;
}

function routeToEditUserProfileView() {
  History.push('/account/profile/edit');
}

function UserProfileData({ userProfile: { email, role, firstname, lastname, middlename, picture } }) {

  const classes = useUserProfileDataStyles();
  return <>
    <ListItemAvatar>{
        picture
        ? <Avatar className={classes.picture} src={'/files/' + picture.fileSourceKey} />
        : <AccountCircle className={classes.icon} />
    }</ListItemAvatar>
    <Typography>{lastname} {firstname} {middlename}</Typography>
    {diplayRole(role)}
    <Typography>{email}</Typography>
    <Button className={classes.editButton} color="primary" onClick={routeToEditUserProfileView}><EditIcon className={classes.editIcon} />Редактировать</Button>
  </>;
}
UserProfileData = React.memo(UserProfileData);

function EditUserProfileForm({ form }) {
  
  const classes = useEditUserProfileFormStyles();
  return <Form comp={form} submitText="Сохранить" submitIcon={SaveIcon} resetText="Сбросить">
    <TextField name="lastname" validate={validateLastname}
      label="Фамилия" className={classes.lastname}
    />
    <TextField name="firstname" validate={validateFirstname}
      label="Имя" className={classes.firstname}
    />
    <TextField name="middlename"
      label="Отчество" className={classes.middlename}
    />
    <DragAndDropImageDialog className={classes.picture} name="picture" label="Изображение профиля" />
  </Form>;
}
EditUserProfileForm = React.memo(EditUserProfileForm);

function EditUserProfile({ userProfile }) {
  const form = useForm(updateUserProfile, userProfile);

  const classes = useEditUserProfileStyles();
  return <>
    <div className={classes.topBar}>
      <RouteBackBtn path="/account/profile" />
      <Typography>Назад</Typography>
    </div>
    {userProfile && <EditUserProfileForm form={form} />}
  </>;
}
EditUserProfile = React.memo(EditUserProfile);

function UserProfile({ edit }) {

  //console.log('edit:', edit);
  const [{ userProfile }, loading, errors] = useQuery(USER_PROFILE);

  //const classes = useUserProfileStyles();
  return <Loader loading={loading} errors={errors}>
    {userProfile && (
      edit
        ? <EditUserProfile userProfile={userProfile} />
        : <UserProfileData userProfile={userProfile} />
    )}
  </Loader>;
}

export default React.memo(UserProfile);