const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Brand = require('../models/Brand');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/brands';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ order: 1, name: 1 });
    res.json({
      success: true,
      brands
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brands'
    });
  }
});

// Get single brand
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    res.json({
      success: true,
      brand
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brand'
    });
  }
});

// Create new brand
router.post('/', async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({
      success: true,
      brand
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating brand'
    });
  }
});

// Update brand
router.put('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    res.json({
      success: true,
      brand
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating brand'
    });
  }
});

// Upload images for a brand
router.post('/:id/images', upload.array('images', 10), async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    const newImages = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size
    }));

    brand.images.push(...newImages);
    await brand.save();

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      images: newImages,
      brand
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading images'
    });
  }
});

// Delete image from brand
router.delete('/:id/images/:imageId', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    const imageIndex = brand.images.findIndex(img => img._id.toString() === req.params.imageId);
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const image = brand.images[imageIndex];
    
    // Delete file from filesystem
    if (fs.existsSync(image.path)) {
      fs.unlinkSync(image.path);
    }

    // Remove from database
    brand.images.splice(imageIndex, 1);
    await brand.save();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image'
    });
  }
});

// Initialize brands with default data
router.post('/initialize', async (req, res) => {
  try {
    const existingBrands = await Brand.countDocuments();
    if (existingBrands > 0) {
      return res.json({
        success: true,
        message: 'Brands already initialized'
      });
    }

    const defaultBrands = [
      {
        name: 'Agape',
        description: 'Prémiový taliansky dodávateľ kúpeľňových batérií, sanity, nábytku a kúpeľňových doplnkov',
        website: 'https://www.agapedesign.it/',
        logo: '/icons/Agape_transparent.png',
        category: 'Kúpeľňový nábytok',
        logoSize: 'max-h-20',
        order: 1
      },
      {
        name: 'Fantini',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií a doplnkov',
        website: 'https://www.fantini.it/',
        logo: '/fantini.png',
        category: 'Batérie a sprchy',
        order: 2
      },
      {
        name: 'Cielo',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        website: 'https://www.ceramicacielo.it/',
        logo: '/logo_cielo_white.png',
        category: 'Sanitárna keramika',
        logoSize: 'max-h-14',
        order: 3
      },
      {
        name: 'Azzurra',
        description: 'Prémiový taliansky výrobca kúpeľňovej sanity, nábytku a kúpeľňových doplnkov',
        website: 'https://www.azzurra.it/',
        logo: '/logoAZZ.svg',
        category: 'Sanitárna keramika',
        logoSize: 'max-h-40',
        logoFilter: 'brightness(0) invert(1)',
        order: 4
      },
      {
        name: 'Cea',
        description: 'Prémiový taliansky výrobca kúpeľňových a kuchynských batérií, elektrických sušiakov a doplnkov',
        website: 'https://www.ceadesign.it/',
        logo: '/cea.svg',
        category: 'Batérie a doplnky',
        logoSize: 'max-h-14',
        order: 5
      },
      {
        name: 'Zenon',
        description: 'Prémiový španielsky výrobca umývadiel, vaní a sprchových vaničiek',
        website: 'https://zenonsurfaces.com/en/',
        logo: '/icons/ZENON_2024.png',
        category: 'Povrchy a vane',
        logoFilter: 'brightness(0) invert(1)',
        order: 6
      },
      {
        name: 'Fondovalle',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        website: 'https://fondovalle.it/',
        logo: '/icons/Fondovalle.png',
        category: 'Obklady a dlažby',
        logoSize: 'max-h-32',
        order: 7
      },
      {
        name: 'Fiandre',
        description: 'Prémiový taliansky výrobca keramických obkladov a dlažieb',
        website: 'https://www.fiandre.com/',
        logo: '/logogf.png',
        category: 'Obklady a dlažby',
        order: 8
      },
      {
        name: 'Antrax',
        description: 'Prémiový taliansky výrobca dizajnových radiátorov',
        website: 'https://www.antrax.it/',
        logo: '/antrax-logo.png',
        category: 'Radiátory',
        order: 9
      },
      {
        name: 'Tres',
        description: 'Ďalší producenti, ktorých vám vieme ponúknuť',
        website: 'https://tresgriferia.com/',
        logo: '/TRES_logo_W.svg',
        category: 'Ostatné',
        order: 10
      }
    ];

    await Brand.insertMany(defaultBrands);

    res.json({
      success: true,
      message: 'Brands initialized successfully',
      count: defaultBrands.length
    });
  } catch (error) {
    console.error('Error initializing brands:', error);
    res.status(500).json({
      success: false,
      message: 'Error initializing brands'
    });
  }
});

module.exports = router;
