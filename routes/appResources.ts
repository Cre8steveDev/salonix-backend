import { Request, Response, Router } from 'express';
import { PopularHairStyles, Services } from '../models/models';

// Define Router Instance
const router = Router();

// Get Specific Service Data
router.get(
  '/services/:serviceID',
  async (request: Request, response: Response) => {
    const { serviceID } = request.params;

    // Find the Service From Database
    try {
      // Get Specific Service From Database
      const requested = await Services.findOne({ id: serviceID });

      // Return Service
      return response.status(200).json({ success: true, data: requested });
    } catch (error) {
      return response.status(404).json({
        success: false,
        data: null,
      });
    }
  }
);

// Get All Popular Photos
// TODO: Implement Limits and Skips
router.get('/popular', async (request: Request, response: Response) => {
  // Find all Data in Popular hair styles
  try {
    // Get Specific Service From Database
    const allPopularStyles = await PopularHairStyles.find();

    // Return all popular hair styles on DB
    return response.status(200).json({ success: true, data: allPopularStyles });
  } catch (error) {
    return response.status(404).json({
      success: false,
      data: null,
    });
  }
});

// Seed Database with Data
router.post('/services/seed', async (request: Request, response: Response) => {
  const { id, image, description, rating, price } = request.body;

  // Ttry to add the data to the Database
  try {
    const newService = new Services({
      id,
      image,
      description,
      rating,
      price,
      name,
    });

    await newService.save();

    response.status(200).json({
      success: true,
      message: 'Successfully added service to database.',
    });
  } catch (error) {
    response.status(403).json({
      success: false,
      message: 'Requested Service was not found',
    });
  }
});

// Seed Database with Popular Styles
router.post('/popular/seed', async (request: Request, response: Response) => {
  const { image, name } = request.body;

  // Ttry to add the data to the Database
  try {
    const newPopular = new PopularHairStyles({ image, name });

    await newPopular.save();

    response.status(200).json({
      success: true,
      message: 'Successfully added Popular Hairstyle to database.',
    });
  } catch (error) {
    console.log(error);
    response.status(403).json({
      success: false,
      message: 'There was an Error adding hairstyle to DB',
    });
  }
});

// Export Router
export default router;
