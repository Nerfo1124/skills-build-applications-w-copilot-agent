import DataResourcePage from './DataResourcePage';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/';
const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  return (
    <DataResourcePage
      endpoint={endpoint}
      endpointTemplate={codespaceEndpoint}
      resource="leaderboard"
      title="Leaderboard"
      description="Competitive rankings loaded from the REST API."
      emptyMessage="No leaderboard data found."
      detailsTitle="Leaderboard entry"
      columns={[
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
      ]}
    />
  );
}

export default Leaderboard;