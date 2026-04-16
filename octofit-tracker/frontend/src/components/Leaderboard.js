import DataResourcePage from './DataResourcePage';

function Leaderboard() {
  return (
    <DataResourcePage
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