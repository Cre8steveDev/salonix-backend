import { NextFunction, Request, Response, Router } from 'express';
import { Users, Appointments } from '../models/models';

const router = Router();

// Get a Specific Appointment

router.get('/:id', async (request: Request, response: Response) => {
  console.log(request.params);

  //

  //
  return response
    .status(200)
    .json({ message: 'Endpoint hit', param: request.params });
});

// Export Router
export default router;
