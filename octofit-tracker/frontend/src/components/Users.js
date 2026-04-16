import DataResourcePage from './DataResourcePage';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/';
const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  return (
    <DataResourcePage
      endpoint={endpoint}
      endpointTemplate={codespaceEndpoint}
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