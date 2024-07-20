import mongoose, { Document, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

interface AppointmentDataObj {
  id: number;
  isBooked: boolean;
  startTime: string;
  endTime: string;
}

interface AppointmentDocument extends Document {
  dayId: string;
  dayAppointments: AppointmentDataObj[];
}

// Appointment Schema
const appointmentSchema = new Schema<AppointmentDocument>(
  {
    dayId: String,
    dayAppointments: {
      type: [
        {
          id: { type: Number },
          isBooked: { type: Schema.Types.Boolean },
          startTime: String,
          endTime: String,
        },
      ],
      default: function () {
        return [
          { id: 1, isBooked: false, startTime: '08:00am', endTime: '08:30am' },
          { id: 2, isBooked: false, startTime: '08:30am', endTime: '09:00am' },
          { id: 3, isBooked: false, startTime: '09:00am', endTime: '09:30am' },
          { id: 4, isBooked: false, startTime: '09:30am', endTime: '10:00am' },
          { id: 5, isBooked: false, startTime: '10:00am', endTime: '10:30am' },
          { id: 6, isBooked: false, startTime: '10:30am', endTime: '11:00am' },
          { id: 7, isBooked: false, startTime: '11:00am', endTime: '11:30am' },
          { id: 8, isBooked: false, startTime: '11:30am', endTime: '12:00am' },
          { id: 9, isBooked: false, startTime: '12:00am', endTime: '12:30pm' },
          { id: 10, isBooked: false, startTime: '12:30am', endTime: '01:00pm' },
          { id: 11, isBooked: false, startTime: '01:00pm', endTime: '01:30pm' },
          { id: 12, isBooked: false, startTime: '01:30pm', endTime: '02:00pm' },
          { id: 13, isBooked: false, startTime: '02:00pm', endTime: '02:30pm' },
          { id: 14, isBooked: false, startTime: '02:30pm', endTime: '03:00pm' },
          { id: 15, isBooked: false, startTime: '03:00pm', endTime: '03:30pm' },
          { id: 16, isBooked: false, startTime: '03:30pm', endTime: '04:00pm' },
          { id: 17, isBooked: false, startTime: '04:00pm', endTime: '04:30pm' },
          { id: 18, isBooked: false, startTime: '04:30pm', endTime: '05:00pm' },
          { id: 19, isBooked: false, startTime: '05:00pm', endTime: '05:30pm' },
          { id: 20, isBooked: false, startTime: '05:30pm', endTime: '06:00pm' },
        ];
      },
    },
  },
  { timestamps: true }
);

//  Users Schema
const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    profilePhoto: {
      type: String,
      required: false,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg',
    },
    appointments: {
      type: [
        {
          email: String,
          gender: String,
          fullName: String,
          chosenService: String,
          price: Number,
          date: String,
          startTime: String,
          endTime: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// Wallet Schema For User
const walletSchema = new Schema({
  currentBalance: { type: Number, default: 0 },
  transactions: {
    type: [
      {
        amount: Number,
        transactionType: {
          type: String,
          enum: {
            values: ['Deposit', 'Payment'],
            message: '{VALUE} is not a valid transaction type.',
          },
        },
        service: String,
        date: String,
      },
    ],
  },
});

// Service Schema
const servicesSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Popular Hairstyles Schema
const popularHairstyleSchema = new Schema(
  {
    image: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export {
  userSchema,
  walletSchema,
  appointmentSchema,
  servicesSchema,
  popularHairstyleSchema,
};
