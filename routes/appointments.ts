import { NextFunction, Request, Response, Router } from 'express';
import { Users, Appointments } from '../models/models';

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

export default router;
