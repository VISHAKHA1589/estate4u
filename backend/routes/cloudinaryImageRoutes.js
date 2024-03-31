import express from 'express';
const router = express.Router();
import Property from '../models/propertyModel';

router.get('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;
    // Construct the Cloudinary URL for the image using the public_id
    const cloudinaryUrl = `https://res.cloudinary.com/dncttioia/image/upload/${public_id}`;
    // Redirect the request to the Cloudinary URL
    res.redirect(cloudinaryUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
