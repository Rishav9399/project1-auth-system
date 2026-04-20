import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define the TyteScript Interface (for strict typing)
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional because OAuth users (Google/GitHub) won't have a password.
  provider: 'local' | 'google' | 'github';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Define the mongoose schema (For MongoDB Validation).
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false }, // 'select: false' --> hides it from quries.
    provider: { type: String, enum: ['local', 'google', 'github'], default: 'local'} 
  },
  { timestamps: true } // Automatically adds createAt and updateAt
);

// 3. Stella's Security Rule: Hash the password Before saving.
UserSchema.pre('save', async function (this: IUser) {
  // 'this' refers to the user document being saved.
  if(!this.isModified('password') || !this.password) {
    return; // Just return, Mongoose will automatically proceed!
  }

  // We don't need a try/catch here becauise unhandled async errord
  // are aucomatically caught by Mongoose in modern versions
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// 4. Helper Method: Check Password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password || '');
};

export default mongoose.model<IUser>('User', UserSchema);