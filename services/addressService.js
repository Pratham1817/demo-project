import User from "../models/userModel.js";

export const addAddressService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.addresses.push(data);
  await user.save();

  return user.addresses;
};

export const getAddressesService = async (userId) => {
  const user = await User.findById(userId).select("addresses");
  if (!user) 
    throw new Error("User not found");
  return user.addresses;
};

export const updateAddressService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const address = user.addresses.id(data.addressId);
  if (!address) throw new Error("Address not found");

  Object.assign(address, data);
  await user.save();

  return user.addresses;
};
