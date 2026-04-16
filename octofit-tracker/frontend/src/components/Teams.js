import DataResourcePage from './DataResourcePage';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/';
const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  return (
    <DataResourcePage
      endpoint={endpoint}
      endpointTemplate={codespaceEndpoint}
      resource="teams"
      title="Teams"
      description="Team roster and descriptions from the backend."
      emptyMessage="No teams found."
      detailsTitle="Team details"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description', render: item => item.description || 'No description provided.' },
      ]}
    />
  );
}

export default Teams;