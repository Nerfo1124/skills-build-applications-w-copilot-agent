import DataResourcePage from './DataResourcePage';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/';
const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  return (
    <DataResourcePage
      endpoint={endpoint}
      endpointTemplate={codespaceEndpoint}
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