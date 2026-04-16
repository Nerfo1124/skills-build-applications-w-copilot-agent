import DataResourcePage from './DataResourcePage';

function Workouts() {
  return (
    <DataResourcePage
      resource="workouts"
      title="Workouts"
      description="Workout recommendations and logged reps from the API."
      emptyMessage="No workouts found."
      detailsTitle="Workout details"
      columns={[
        { key: 'user', label: 'User' },
        { key: 'workout', label: 'Workout' },
        { key: 'reps', label: 'Reps' },
      ]}
    />
  );
}

export default Workouts;