import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTaskDTO, TaskDto } from '../../common/types/types';

type Props = {
  task: TaskDto;
};

export const Task: FC<Props> = ({ task }) => {
  const { description, completed } = task;

  return (
    <li>
      <h3>{description}</h3>
      <span>{completed ? '+' : '-'}</span>
    </li>
  );
};

export const Tasks: FC = () => {
  const [tasks, setTasks] = useState<Array<TaskDto>>([]);
  const { handleSubmit, register, formState } = useForm<CreateTaskDTO>({
    defaultValues: {
      completed: false,
    },
  });

  const { errors } = formState;

  const createTask = (data: CreateTaskDTO) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(1);
  }, []);

  return (
    <div>
      <h2>New task</h2>
      <form onSubmit={handleSubmit(createTask)}>
        <input type="text" {...register('description')} />
        <input type="checkbox" {...register('completed')} />
        <button>Create task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </ul>
    </div>
  );
};
