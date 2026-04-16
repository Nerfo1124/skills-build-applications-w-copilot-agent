import DataResourcePage from './DataResourcePage';

function Users() {
  return (
    <DataResourcePage
      resource="users"
      title="Users"
      description="Registered users rendered from the REST API."
      emptyMessage="No users found."
      detailsTitle="User details"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
      ]}
    />
  );
}

export default Users;