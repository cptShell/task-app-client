import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTaskDTO, TaskDto } from '../../common/types/types';
import { taskApi } from '../../services/services';

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
    defaultValues: { completed: false },
  });

  const { errors } = formState;

  const createTask = async (data: CreateTaskDTO): Promise<void> => {
    const { data: task } = await taskApi.createTask(data);

    if (task) setTasks(tasks.concat(task));
  };

  useEffect(() => {
    const loadTasks = async () => {
      const { data, message } = await taskApi.getTasks();
      if (data) setTasks(data);
    };
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit(createTask)}>
        <input type="text" {...register('description')} />
        <input type="checkbox" {...register('completed')} />
        <button>Create task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};
