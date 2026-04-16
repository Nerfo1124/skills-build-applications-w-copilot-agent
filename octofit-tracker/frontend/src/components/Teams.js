import DataResourcePage from './DataResourcePage';

function Teams() {
  return (
    <DataResourcePage
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