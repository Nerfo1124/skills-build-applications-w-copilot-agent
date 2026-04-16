import DataResourcePage from './DataResourcePage';

function Activities() {
  return (
    <DataResourcePage
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