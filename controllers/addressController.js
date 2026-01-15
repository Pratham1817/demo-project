import User from "../models/userModel.js";

// Add new address
export async function addAddress(req, res) {
  const { street, city, state, country, zip, phone } = req.body;

  if (!street || !city || !state || !country || !zip || !phone) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.addresses.push({ street, city, state, country, zip, phone });
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get all addresses of the user
export async function getAddresses(req, res) {
  try {
    const user = await User.findById(req.user._id).select("addresses");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      addresses: user.addresses, 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


// Update addresss
export async function updateAddress(req, res) {
  const { addressId, street, city, state, country, zip, phone } = req.body;

  if (!addressId) {
    return res.status(400).json({ success:false, message:"Address ID required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success:false, message:"User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ success:false, message:"Address not found" });

    // Only update fields that are provided
    if (street !== undefined) address.street = street;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (country !== undefined) address.country = country;
    if (zip !== undefined) address.zip = zip;
    if (phone !== undefined) address.phone = phone;

    await user.save();

    res.json({ success:true, addresses: user.addresses });

  } catch(err) {
    console.log(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
}
