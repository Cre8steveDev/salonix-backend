import { NextFunction, Request, Response, Router } from 'express';
import { Users, Appointments, Wallet } from '../models/models';
import verifyUser from '../middleware/verifyUser';

// Import mongoose to use to access session
import mongoose from 'mongoose';
import { TAppointmentData } from '../types/types';

const router = Router();

// Get a Specific Appointment

router.get('/day/:date', async (request: Request, response: Response) => {
  let { date } = request.params;
  // date = date.replace('-', '');

  // Mini Validation for parameters
  if (!date || date.length < 6) {
    return response.status(400).json({
      success: false,
      message: 'BAD REQUEST. Please provide a valid date string.',
    });
  }

  // Check if current date exists in database.
  try {
    const allDaySlots = await Appointments.findOne({ dayId: date });

    // If Slots are already registered on db, return it.
    if (allDaySlots)
      return response.status(200).json({
        success: true,
        message: 'Successfully retrieved available slots',
        slots: allDaySlots,
        date,
      });
  } catch (error: any) {
    console.log(error?.message);
  }

  // If date has not been previously created in DB
  try {
    console.log('Day not found, so creating a new entry');
    const createDaySlots = new Appointments({ dayId: date });
    const saved = await createDaySlots.save();

    // Return the newly created day's slots
    return response.status(200).json({
      success: true,
      message: 'Successfully retrieved available slots',
      slots: saved,
      date,
    });
  } catch (error) {
    console.log('An unknown error occured.');
    return response.status(200).json({
      success: false,
      message: 'An unknown error occured.',
      slots: null,
      date,
    });
  }
});

// Book an appointment
// Ensure Atomicity using MongoDB Transactions

router.post(
  '/book',
  verifyUser,
  async (request: Request, response: Response) => {
    const appointmentData = request.body as TAppointmentData;
    // @ts-ignore
    const userId = request.user._id;

    // PERFORM TRANSACTIONS FOR ATOMICITY
    // Find user's wallet and subtract price of service
    // add isBooked = true for selected day time slot.
    // Add Appointment data to user's array
    const session = await mongoose.startSession();
    session.startTransaction();

    // Begin Process for update
    try {
      // 1. Update the wallet
      const wallet = await Wallet.findOneAndUpdate(
        { _id: appointmentData.walletId },
        {
          // Use negative amount for a payment
          // When doing incrementation of a field
          $inc: { currentBalance: -appointmentData.price },
          $push: {
            transactions: {
              amount: appointmentData.price,
              transactionType: 'Payment',
              service: appointmentData.chosenService,
              date: appointmentData.date,
            },
          },
        },
        { session, new: true }
      );

      // If the user's account balance is less than
      // zero after transaction then throw an error.
      if (!wallet || wallet.currentBalance < 0) {
        throw new Error('Insufficient funds');
      }

      // 2. Update the appointment to set selected slot as booked
      const updatedAppointmentTimeSlot = await Appointments.findOneAndUpdate(
        {
          dayId: appointmentData.date,
          'dayAppointments.startTime': appointmentData.startTime,
        },
        {
          $set: { 'dayAppointments.$.isBooked': true },
        },
        { session, new: true }
      );

      if (!updatedAppointmentTimeSlot) {
        throw new Error('Appointment Time Slot not found or already booked');
      }

      // 3. Add the Booked Appointment  to the User's Array of Appointments
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        {
          $push: {
            appointments: {
              email: appointmentData.email,
              gender: appointmentData.gender,
              fullName: appointmentData.fullName,
              chosenService: appointmentData.chosenService,
              price: appointmentData.price,
              date: appointmentData.date,
              startTime: appointmentData.startTime,
              endTime: appointmentData.endTime,
            },
          },
        },
        { session, new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      // If all operations are successful, commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Return Success message back to user
      return response.status(201).json({
        success: true,
        message: 'Successfully booked appointment.',
      });

      // Otherwise other errors thrown will be caught
    } catch (error) {
      console.log(error);
      // If any operation fails, abort the transaction (rollback)
      await session.abortTransaction();
      session.endSession();

      // Return Failed Response for when  any of the
      // transactions fail.
      return response.status(400).json({
        success: false,
        message: 'Something went wrong. Try again later.',
      });
    }
  }
);

export default router;
