const Group = require("../models/group.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const crypto = require("crypto");
const findUser = require('../utils/findUserById');
const sendEmail = require("../utils/sendMail");
const UserInvitationEmail = require("../models/userInvitationEmail.model");

const hashData = require("../utils/hashData");
const compareData = require("../utils/compareData");
module.exports = {
  create: async (req, res) => {
    try {
      const _creatorId = req._userId;
      const newGroup = await Group.create({ ...req.body, creator: _creatorId });
      if (!newGroup) {
        return res
          .status(400)
          .json({ success: false, message: "Couldn't create new Group" });
      }
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
      return res.status(500).json({ success: false, message: error });
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

      var subject = "The invitation to join our team '";

      const user = await findUser(_userId);

      const _guestIdArray = req.params._guestId.split(',');
      for (const _guestId of _guestIdArray) {
        var guest = await findUser(_guestId);

        const group = await Group.findById(_id);
        if (group.members.length!=0) {
          const invitor = group.members.find((value) => value.equals(req._userId));
          if (!invitor) {
            return res
              .status(400)
              .json({ success: false, message: "You are not yet a member of this group!" });
          }
          const isGuestMember = group.members.find((value) => value.equals(guest._id));
          if (isGuestMember) {
            return res
              .status(400)
              .json({ success: false, message: "The user you want to invite to join your group is already a member!" });
          }

          //Concatenation du Subject
          subject += `${group.name}'`;
          // Sender's emai
          let from;
          // Condition if the group's creator send the invitation to other person
          if (group.creator != user._id) {
            from = user.email;
          }

          const response = await sendInvitationEmail({ _group: _id, _id: _userId, _guest: guest, subject });
          if (response) {
            return res
              .status(200)
              .json({ success: true, message: `The invitation to join your team '${group.name}' has been sent!` });
          }
        } else {
          return res
              .status(404)
              .json({ success: false, message: "Group not found!" });
        }
      }

    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  },

  acceptInvitation: async (req, res) => {
    try {
      const group = await Accept(req.params);
      if (group) {
        return res
          .status(200).
          json({ success: true, message: "You are now part of this group!" })
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  }
};


async function sendInvitationEmail({ _group,_id, _guest, subject }) {
  try {
    const uniqueString = crypto.randomUUID() + _id;
    const currentUrl = "http://localhost:3001/";
    const user = await findUser(_id);

    console.log("UniqueString => ",uniqueString);

    const { email } = _guest;

    //html
    const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .paragraph {
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          background-color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          border-radius: 5px;
          border: 1px solid blue;
          transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
        }
        .button:hover {
          background-color: white;
          color: black;
          border: 1px solid black;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">${user.username} invites you to join their team</h1>
        <p class="paragraph">Dear recipient,</p>
        <p class="paragraph">We are pleased to invite you to join our team. We believe that your expertise and skills would be a valuable asset to our group.</p>
        <p class="paragraph">We would be delighted to have you on board and work together to reach new heights.</p>
        <p class="paragraph">Click the button below to accept our invitation:</p>
        <a class="button" href="${currentUrl + "api/group/" + _group +"/"+ _id + "/invite/" + _guest._id + "/" + uniqueString}">Accept the invitation</a>
        <p class="paragraph">Best regards,</p>
      </div>
    </body>
  </html>
`;

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email.trim(),
      subject,
      html
    };
    // Verify hash
    const hashedUniqueString = await hashData(uniqueString);
    const newInvitation = new UserInvitationEmail({
      userId: _id,
      userGuestId: _guest._id,
      uniqueString: hashedUniqueString,
      expiresAt: Date.now() + 900000
    });
    // save the user Invitation record
    await newInvitation.save();
    await sendEmail(mailOptions);
    return {
      userId: _guest._id,
      email: email.trim()
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function Accept({_group,_id,_guestId,uniqueString}) {
  try {
    const userInvitationEmailExist = await UserInvitationEmail.findOne({
      $and:[{userId:_id},{userGuestId:_guestId}]
    })
    if (userInvitationEmailExist) {
      const match = await compareData(uniqueString, userInvitationEmailExist.uniqueString);
      if (match) {
        const group = await Group.findByIdAndUpdate(
          { _id: _group },
          { $push: { members: _guestId } },
          { new: false, upsert:true}
        );
          await UserInvitationEmail.findOneAndDelete({
          $and: [
            { userId: _id },
            { userGuestId: _guestId }
          ]
        })
        return group;
      } else {
        throw new Error("Unknwon unique string!")
      }
    } else {
      throw new Error("Invitation doesn't exist!")
    }
  } catch (error) {
    throw new Error(error);
  }
}
