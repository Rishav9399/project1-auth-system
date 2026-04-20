import User, { IUser } from '../models/User';

export const registerUser = async (userData: Partial<IUser>) => {
  const {name, email, password } = userData;

  // 1. Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is alredy resgistered');
  }

  // 2. Create the new user.
  // (Moongoose will automatically trigger our pre-save hook to hash the password!)
  const user = await User.create({
    name,
    email,
    password,
  });

  // 3. Return the user (but strip out the password just to be safe)
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  // 1. Find the user by email.
  // We MUST add '+password' because we set 'select: false' in the model!
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    throw new Error('Invalid email or password');
  }

  // 2. Check if the password matches using our custom model method.
  const isMatch = await user.comparePassword(password);

  if(!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Retyurn safe user data.
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};