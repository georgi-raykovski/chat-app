import { Request, Response } from 'express';
import { usersData } from '../routes/users';

interface SignupRequestBody {
  username: string;
}

interface GetUserByIdRequestParams {
  id: string;
}

type RequestBody<T extends Record<any, any>> = Request<{}, {}, T>;
type SignupRequest = RequestBody<SignupRequestBody>;

const login = (req: SignupRequest, res: Response) => {
  const { username } = req.body;

  if (usersData.filter((user) => user.username === username).length) {
    res.status(201).json({ message: 'Login successful' });
    return;
  }

  const id = usersData.length + 1;
  const newUser = { username, id };
  usersData.push(newUser);
  res.status(201).json({ message: 'Signup successful' });
};

const getUserById = (req: Request<GetUserByIdRequestParams>, res: Response) => {
  const { id } = req.params;
  const user = usersData.find((user) => user.id === parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const userController = { login, getUserById };
