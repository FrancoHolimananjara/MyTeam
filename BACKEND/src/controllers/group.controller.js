const Group = require("../models/group.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const crypto = require("crypto");
const findUser = require('../utils/findUserById');
const sendEmail = require("../utils/sendMail");
const UserInvitationEmail = require("../models/userInvitationEmail.model");

module.exports = {
  create: async (req, res) => {
    try {
      const _creatorId = req._userId;
      const newGroup = await Group.create({ ...req.body, creator: _creatorId });
      if (!newGroup) {
        return res
          .status(400)
          .json({ success: false, message: "Couldn't create new Group" });
      } else {
        // Add creator in membres
        newGroup.members.push(newGroup.creator);
        await newGroup.save();
        await User.findByIdAndUpdate(
          { _id: _creatorId },
          { $push: { adminInGroup: newGroup._id } },
          { new: false, upsert: true }
        );
        return res.status(201).json({
          success: true,
          message: `Group <b>${newGroup.name}</b> has been created!`,
          data: newGroup,
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  /**
   * RETRIEVE ALL GROUPS FOR EACH CREATOR
   * @param {*} req 
   * @param {*} res 
   * @returns GROUPS
   */
  findAll: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const groups = await Group.find({ creator: _userId }).select("-creator");
      if (groups.length > 0) {
        return res
          .status(200)
          .json({ success: true, message: "All my groups", data: groups });
      } else {
        return res.status(404).json({
          success: false,
          message: "No group for the moment",
          data: [],
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  /**
   * RETREIVE GROUP ASSOCIATE WITH THE VALID ID
   * @param {*} req 
   * @param {*} res 
   * @returns GROUP
   */
  find: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const _id = ObjectId(req.params._id);
      const group = await Group.findOne({
        $and: [{ _id }, { creator: _userId }],
      });
      if (group) {
        return res
          .status(200)
          .json({ success: true, message: "Your group!", data: group });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Group not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },
  /**
   * RETRIEVE ALL MEMBRES IN GROUP
   * @param {*} req 
   * @param {*} res 
   * @returns ALL MEMBERS
   */
  members: async (req, res) => {
    try {
      const _id = ObjectId(req.params._id);
      const group = await Group.findById({ _id })
        .populate("members", ['username', 'email']);
      if (group) {
        for (const m of group.members) {
              if (m._id == req._userId) {
                return res.status(200).json({ members: group.members });
              } else {
                return res
                  .status(404)
                  .json({ success: false, message: "You are not yet a member" });
              }
            }
      } else {
        return res
              .status(404)
              .json({ success: false, message: "Group not found" });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * SEND INVITATION TO THE PERSON YOU WISH TO JOIN YOUR TEAM
   * @param {*} req 
   * @param {*} res 
   */
  sendInvitation: async (req, res) => {
    try {
      const _userId = ObjectId(req._userId);
      const _id = ObjectId(req.params._id);
      const _guestId = ObjectId(req.params._guestId);
      var subject = "The invitation to join our team '";

      const currentUrl = "http://localhost:3001/";

      const user = await findUser(_userId );
      console.log("User" +user);
      const guestUser = await findUser(_guestId);
      console.log("Guest user" + guestUser);

        const group = await Group.findById(_id);
        if (group) {
          group.members.forEach(async (member, i) => {
            if (member == req._userId) {
              if (user.email === guestUser.email) {
                throw new Error("Same email, same user");
              }
              // Concatenation du Subject
              subject += `${group.name}'`;
              // Sender's emai
              var from;
              // Condition if the group's creator send the invitation to other person
              if (group.creator != user._id) {
                from = user.email;
              }
              const mailOptions = {
                from,
                to: guestUser.email,
                subject,
                html: `
                          <h2>${user.username} invite you to join his team</h2>
                          <a href="${currentUrl + "api/group/" + _id + "/invite?guest=" + _guestId}">Accept his invitation</a>
                      `,
              };
              const emailData = await sendEmail(mailOptions);
              return res
                  .status(200)
                  .json({ success: true, message: `IThe invitation to join your team '${group.name}' is sent` });
            } else {
              return res
                  .status(404)
                  .json({ success: false, message: "You are not yet a member" });
            }
          })
        } else {
          return res
              .status(404)
              .json({ success: false, message: "Group not found" });
        }

    } catch (error) {
      throw new Error(error);
    }
  },
  acceptInvitation: async (req, res) => {
    const _guestId = ObjectId(req.query.guest);
    const emailToken = req.query.token;
    const _id = ObjectId(req.params._id);
    await User.findOne({ _id: _guestId, emailToken })
      .then((user) => {
        Group.findOneAndUpdate(
          { _id },
          { $push: { members: _guestId } },
          { new: false, upsert: true }
        )
          .then((success) => {
            if (success) {
              user.emailToken = null;
              return res.status(201).json({ success: true, message: success });
            } else {
              return res
                .status(403)
                .json({ success: false, message: "add new 'members' failed!" });
            }
          })
          .catch((err) => {
            return res.status(500).json({ success: false, message: e });
          });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, message: e });
      });
  },
};


async function sendInvitationEmail({ _id, email }) {
  try {
    const uniqueString = crypto.randomUUID() + _id;
    const currentUrl = "http://localhost:3001/";

    const allIdGuest = await email.forEach(async (e) => {
      var x = [];
      const response = await User.findOne({ e });
      x.push(response);
      return x;
    })

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Verify your email address to complete registration and login to your account.</p>
                <p>This link <b>expires in 30 minutes</b>.</p>
                <p>Press <a href=${
                  currentUrl + "api/auth/verify/" + _id + "/" + uniqueString
                }>here</a> to proceed.</p>
            `,
    };
    // Verify hash
    const hashedUniqueString = await hashData(uniqueString);
    const newInvitation = new UserInvitationEmail({
      userId: _id,
      userGuestId: allIdGuest,
      uniqueString: hashedUniqueString,
      expiresAt: Date.now() + 900000
    });
    // save the user Invitation record
    await newInvitation.save();
    await sendEmail(mailOptions);
    return {
      userId: _id,
      email,
    };
  } catch (error) {
    throw new Error(error);
  }
}