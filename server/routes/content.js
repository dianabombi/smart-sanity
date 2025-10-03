const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find({ isActive: true }).sort({ pageId: 1 });
    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content'
    });
  }
});

// Get content by page ID
router.get('/:pageId', async (req, res) => {
  try {
    const content = await Content.findOne({ 
      pageId: req.params.pageId, 
      isActive: true 
    });
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content'
    });
  }
});

// Create new content
router.post('/', async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating content'
    });
  }
});

// Update content
router.put('/:pageId', async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { pageId: req.params.pageId },
      { 
        ...req.body,
        'metaData.lastModified': new Date(),
        'metaData.modifiedBy': req.body.modifiedBy || 'admin'
      },
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating content'
    });
  }
});

// Delete content (soft delete)
router.delete('/:pageId', async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { pageId: req.params.pageId },
      { isActive: false },
      { new: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting content'
    });
  }
});

// Initialize default content
router.post('/initialize', async (req, res) => {
  try {
    const existingContent = await Content.countDocuments();
    if (existingContent > 0) {
      return res.json({
        success: true,
        message: 'Content already initialized'
      });
    }

    const defaultContent = [
      {
        pageId: 'who-we-are',
        title: 'O nás',
        content: `Smart Sanit je spoločnosť zameraná na poskytovanie profesionálnych riešení v oblasti sanitárnych zariadení. 

Naša spoločnosť sa špecializuje na dodávku kvalitných produktov od renomovaných svetových výrobcov. Spolupracujeme s popredními talianskymi a európskymi značkami, ktoré sú synonymom kvality a dizajnu.

Našim cieľom je poskytovať komplexné riešenia pre interiérových dizajnérov a architektov, ktorí hľadajú tie najlepšie produkty pre svoje projekty.`,
        sections: [
          {
            sectionId: 'mission',
            title: 'Naša misia',
            content: 'Poskytovať najkvalitnejšie sanitárne riešenia pre moderné domácnosti.',
            order: 1
          },
          {
            sectionId: 'vision',
            title: 'Naša vízia',
            content: 'Byť lídrom v oblasti dodávky prémiových sanitárnych zariadení na slovenskom trhu.',
            order: 2
          }
        ],
        metaData: {
          description: 'Informácie o spoločnosti Smart Sanit',
          keywords: ['smart sanit', 'o nás', 'sanitárne zariadenia', 'kúpeľne']
        }
      },
      {
        pageId: 'what-we-offer',
        title: 'Čo ponúkame',
        content: `Naša ponuka zahŕňa široký sortiment produktov a služieb v oblasti sanitárnych zariadení:

• Obchodujeme popredných svetových výrobcov v oblasti vybavenia kúpeľní, obkladov a dlažieb
• Podľa vašich požiadaviek vám vyskladáme kúpeľne z konkrétnych produktov od A po Z
• Spracujeme vám alternatívne riešenia s rôznymi cenovými hladinami
• Vyskladáme vám náročné sprchové, či vaňové zostavy batérií
• Zabezpečíme vám technickú podporu ku všetkým ponúkaným produktom
• Ponúkame vám dlhodobú spoluprácu založenú na odbornosti, spoľahlivosti a férovom prístupe`,
        sections: [
          {
            sectionId: 'products',
            title: 'Produkty',
            content: 'Široký sortiment sanitárnych zariadení od svetových výrobcov.',
            order: 1
          },
          {
            sectionId: 'services',
            title: 'Služby',
            content: 'Komplexné poradenstvo a technická podpora.',
            order: 2
          }
        ],
        metaData: {
          description: 'Produkty a služby spoločnosti Smart Sanit',
          keywords: ['ponuka', 'produkty', 'služby', 'sanitárne zariadenia']
        }
      }
    ];

    await Content.insertMany(defaultContent);

    res.json({
      success: true,
      message: 'Content initialized successfully',
      count: defaultContent.length
    });
  } catch (error) {
    console.error('Error initializing content:', error);
    res.status(500).json({
      success: false,
      message: 'Error initializing content'
    });
  }
});

module.exports = router;
