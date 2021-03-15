import { User } from 'src/app/models/user.model';


export interface State {
  user: User;
}

const initState = {
  user: null,
};

export function authReducer(state = initState, action) {
  return state;
}
