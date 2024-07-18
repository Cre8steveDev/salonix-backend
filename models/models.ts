import mongoose from 'mongoose';
import {
  userSchema,
  appointmentSchema,
  servicesSchema,
  popularHairstyleSchema,
} from './schemas';

// Create all Models from the Schemas
const Appointments = mongoose.model('Appointments', appointmentSchema);
const Users = mongoose.model('Users', userSchema);
const Services = mongoose.model('Services', servicesSchema);
const PopularHairStyles = mongoose.model(
  'PopularHairStyles',
  popularHairstyleSchema
);

export { Users, Appointments, Services, PopularHairStyles };
