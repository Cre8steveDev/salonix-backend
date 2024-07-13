import mongoose from 'mongoose';

// import the schemas
import { userSchema, appointmentSchema } from './schemas';

// Create all Models from the Schemas
const Appointments = mongoose.model('Appointments', appointmentSchema);
const Users = mongoose.model('Users', userSchema);

export { Users, Appointments };
