import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttpRequest from '../../hooks/use-http-request';

const NewTask = (props) => {

  const {isLoading, error, sendRequest: sendTaskRequest} = useHttpRequest();

  const createdTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      { url: 'https://react-http-requests-aa439-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {text: taskText },
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
