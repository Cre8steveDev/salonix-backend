import mongoose from 'mongoose';
import {
  userSchema,
  appointmentSchema,
  servicesSchema,
  popularHairstyleSchema,
  walletSchema,
} from './schemas';

// Create all Models from the Schemas
const Appointments = mongoose.model('Appointments', appointmentSchema);
const Users = mongoose.model('Users', userSchema);
const Wallet = mongoose.model('Wallet', walletSchema);
const Services = mongoose.model('Services', servicesSchema);
const PopularHairStyles = mongoose.model(
  'PopularHairStyles',
  popularHairstyleSchema
);

export { Users, Appointments, Services, PopularHairStyles, Wallet };
