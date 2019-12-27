
function UserItem({ id, email, firstname, lastname, middlename, picture }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={dispstr(firstname, lastname, middlename)} />
  </ListItem>;
}

function Instructors({ instructors }) {

  const userItems = useElementArray(UserItem, [...instructors], { key: user => user.id });
  return <List>
    {userItems}
  </List>;
}