// // @desc Update user profile
// // @route PUT /api/user/profile
// // @access Private (authenticated user)
// exports.updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { name, phone, address } = req.body;

//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.name = name || user.name;
//     user.phone = phone || user.phone;
//     user.address = address || user.address;

//     const updatedUser = await user.save();

//     res.json({
//       message: "Profile updated successfully.",
//       user: {
//         id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         address: updatedUser.address,
//         role: updatedUser.role,
//       },
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Server error while updating profile", error });
//   }
// };
