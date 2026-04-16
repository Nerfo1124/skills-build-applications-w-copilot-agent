import DataResourcePage from './DataResourcePage';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/';
const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  return (
    <DataResourcePage
      endpoint={endpoint}
      endpointTemplate={codespaceEndpoint}
      resource="activities"
      title="Activities"
      description="Recent activity logs from the Django REST API."
      emptyMessage="No activities found."
      detailsTitle="Activity details"
      columns={[
        { key: 'user', label: 'User' },
        { key: 'activity', label: 'Activity' },
        { key: 'duration', label: 'Duration' },
      ]}
    />
  );
}

export default Activities;