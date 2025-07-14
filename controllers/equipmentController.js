const User = require("../model/userModel");
const mongoose = require("mongoose");
const Equipment = require("../model/equipmentModel");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");
const { productCreate, equipValidate } = require("../utils/productValidate");

const createEquipment = async (req, res) => {
  const { price, phoneNumber, name, description, category } = req.body;

  try {
    const { error, value } = productCreate.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    console.log(req.file);

    const savedProduct = await Equipment.create({
      price: value.price,
      phoneNumber: value.phoneNumber,
      name: value.name,
      description: value.description,
      category: value.category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },

      owner: req.user.id,
      isAvailable: true,
    });
    res.status(201).json({ success: true, savedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const allEquipment = await Equipment.find();

    if (allEquipment.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No equipment found",
        item: [],
      });
    }
    return res.status(200).json({
      success: true,
      mesage: "Equipment retrieved successfully",
      item: allEquipment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An expected error has occurred",
      error: error.message,
    });
  }
};

const getOneEquipment = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  const equip = await Equipment.findById(id);
  if (!equip) {
    return res.status(404).json({
      success: false,
      message: "Equipment not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Equipment retrieved successfully",
    item: equip,
  });
};

const deleteEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const equip = await Equipment.findByIdAndDelete(id);
    if (!equip) {
      return res.status(404).json({
        success: false,
        message: "No equipment found",
      });
    }

    if (equip.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }
    await cloudinary.uploader.destroy(equip.image.public_id);
    return res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete equipment. An expected error occured",
      success: false,
    });
  }
};

// const updateEquipment = async (req, res)=>{
//   // const{name, price, phoneNumber, description} = req.body;

//   try {
//       const id = req.params.id;

//      if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(400).json({
//       success: false,
//       message: "Invalid ID format"
//     })
//   }

//   const equip = await Equipment.findById(id);

//   if(!equip){
//     return res.status(404).json({
//       success: false,
//       message: "No equipment found"
//     })
//   }

//   if(equip.owner.toString() !== req.user.id){
//     return res.status(403).json({
//       success: false,
//       message: "Not allowed"
//     })

// // ✅ At this point, req.body is expected to be defined
//     const { name, price, phoneNumber, description } = req.body;
//      // Validate input excluding image, which comes from req.file
//     const { error, value } = equipValidate.validate(req.body, {
//       abortEarly: false,
//     });

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         error: error.details.map((err) => err.message),
//       });
//     }
//   }
//  // Handle image if one is uploaded
//     if (req.file) {
//       if (equip.image && equip.image.public_id) {
//         await cloudinary.uploader.destroy(advert.image.public_id);
//       }

//       const result = await cloudinary.uploader.upload(req.file.path);
//       await fs.unlink(req.file.path); // Clean up temp file

//       value.image = {
//         public_id: result.public_id,
//         url: result.secure_url,
//       };

//     }

//       const updatedEquipment = await equip.findByIdAndUpdate(id, value, {
//       new: true,
//       runValidators: true,
//     });
//     await updatedEquipment.save();

//     return res.status(200).json({
//       success: true,
//       message: "Update successful",
//       item: updatedEquipment

//     })
//   } catch (error) {
//     console.log(error)
//      return res.status(500).json({
//       success: false,
//       message: "Failed to update equipment. An unexpected error occurred.",
//       error: error.message,
//     });
//   }

// };

const updateEquipment = async (req, res) => {
  const { name, price, phoneNumber, description, category } = req.body;

  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const equip = await Equipment.findById(id);
    if (!equip) {
      return res.status(404).json({
        success: false,
        message: "No equipment found",
      });
    }

    if (equip.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    // ✅ Validate input
    const { error, value } = equipValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details.map((err) => err.message),
      });
    }

    // ✅ If image is uploaded
    if (req.file) {
      if (equip.image && equip.image.public_id) {
        await cloudinary.uploader.destroy(equip.image.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      await fs.unlink(req.file.path); // remove temp file

      value.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // ✅ Use Equipment model, not equip instance
    const updatedEquipment = await Equipment.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Update successful",
      item: updatedEquipment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update equipment. An unexpected error occurred.",
      error: error.message,
    });
  }
};
const searchItemByVendor = async(req, res)=>{

  try {
    const {name, category} = req.query;
    const query ={};

    query.owner = req.user.id;

    //search by category
  if(category){
    query.category={$regex: category, $options: "i"}; // case-insensitive
  }
  //search by name
   if(name){
    query.name={$regex: name, $options: "i"}; // case-insensitive

  }
  const search = await Equipment.find(query);
  if (search.length === 0) {
      return res.status(404).json({
        success: false,
        items: [],
        message: "No equipment found matching your search criteria",
      });
    }

    return res.status(200).json({
      success: true,
      items: search,
      message: "Equipment retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve equipment. An unexpected error occurred",
    });
  }
    
 
}


const searchItemByUser = async(req, res)=>{

  try {
    const {name, category} = req.query;
    const query ={};


    //search by category
  if(category){
    query.category={$regex: category, $options: "i"}; // case-insensitive
  }
  //search by name
   if(name){
    query.name={$regex: name, $options: "i"}; // case-insensitive

  }
  const search = await Equipment.find(query);
  if (search.length === 0) {
      return res.status(404).json({
        success: false,
        items: [],
        message: "No equipment found matching your search criteria",
      });
    }

    return res.status(200).json({
      success: true,
      items: search,
      message: "Equipment retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve equipment. An unexpected error occurred",
    });
  }
    
 
}
const getAllEquipmentByOwner = async (req, res) => {
  try {
    // const allAdverts = await Advert.find();
    // Get only the adverts belonging to the logged-in vendor
    const allequip = await Equipment.find({ owner: req.user.id });
    if (!allequip || allequip.length === 0) {
      return res.status(404).json({
        success: false,
        items: [],
        message: "No equipments found",
      });
    }
    return res.status(200).json({
      success: true,
      items: allequip,
      message: "Equipments retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve equipments. An expected error occured",
    });
  }
};
module.exports = {
  createEquipment,
  getAllEquipment,
  deleteEquipment,
  updateEquipment,
  getAllEquipmentByOwner,
  getOneEquipment,
  searchItemByVendor,
  searchItemByUser
};
