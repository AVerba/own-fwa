import styles from './TempForm.module.css';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/operation';

export const TempForm = () => {
  const dispatch = useDispatch();
  const onSubmit = event => {
    event.preventDefault();

    const balance = parseInt(event.target[0].value);

    dispatch(authOperations.setBalance({ balance }))
      .then(response => {
        console.log(response);
      })
      .catch(() => {
        console.log('wrong pass or login::');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="balamce">Enter balamce</label>
      <input id="balamce" name="balamce" type="number" />

      <button type="submit">Send data!</button>
    </form>
  );
};
