import { Request, Response } from 'express';
import { usersData } from '../routes/users';
import { RequestBody } from '../types';
import { UserFactory, UserType } from '../factories';

interface SignupRequestBody {
  username: string;
}

interface GetUserByIdRequestParams {
  id: string;
}

type SignupRequest = RequestBody<SignupRequestBody>;

const login = (req: SignupRequest, res: Response) => {
  const { username } = req.body;

  if (usersData.filter((user) => user.getName() === username).length) {
    res.status(201).json({ message: 'Login successful' });
    return;
  }

  const id = (usersData.length + 1).toString();
  const newUser = UserFactory.createMember(UserType.Regular, username, id);
  usersData.push(newUser);
  res.status(201).json({ message: 'Signup successful' });
};

const getUserById = (req: Request<GetUserByIdRequestParams>, res: Response) => {
  const { id } = req.params;
  const user = usersData.find((user) => user.getId() === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const userController = { login, getUserById };
