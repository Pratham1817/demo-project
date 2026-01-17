import {
  addAddressService,
  getAddressesService,
  updateAddressService,} from "../services/addressService.js";

export const addAddress = async (req, res) => {
  try {
    const addresses = await addAddressService(req.user._id, req.body);
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await getAddressesService(req.user._id);
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const addresses = await updateAddressService(req.user._id, req.body);
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
