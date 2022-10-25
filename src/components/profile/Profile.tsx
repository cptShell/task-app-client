import { FC, useRef, useState } from 'react';
import { User } from '../../common/types/types';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { user as userActions } from '../../store/actions';

type Props = {
  user: User;
};

export const Profile: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [isEditable, setEditableMode] = useState<boolean>(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const { name, age, email } = user;

  const handleChangeName = async () => {
    const input = nameInput.current;

    console.log(input?.value);
    if (input) await dispatch(userActions.updateName(input.value));
  };

  const handleEditMode = () => {
    setEditableMode(!isEditable);
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        {!isEditable ? (
          <p>{name}</p>
        ) : (
          <>
            <input ref={nameInput} />
            <button onClick={handleChangeName}>accept</button>
          </>
        )}
        <button onClick={handleEditMode}>edit profile</button>
      </div>
      <p>{email}</p>
      <p>{age} years</p>
    </div>
  );
};
