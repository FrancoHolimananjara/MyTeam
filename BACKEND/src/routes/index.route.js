const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const taskController = require("../controllers/task.controller");
const groupController = require("../controllers/group.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/auth/register").post(authController.register);
router.route("/auth/login").post(authController.login);
router.route("/auth/verify/:_id/:uniqueString").get(authController.verify_email);
router.route("/auth/resend_verification_email/:_id/").post(authController.resendVerificationEmail);

router.route("/me/profile").get(authMiddleware, userController.profile);

router.route("/task/new").post(authMiddleware, taskController.create);
router.route("/me/task").get(authMiddleware, taskController.findAll);
router
  .route("/me/task/:_id")
  .get(authMiddleware, taskController.find)
  .put(authMiddleware, taskController.completed)
  .delete(authMiddleware, taskController.delete);

router.route("/group/new").post(authMiddleware, groupController.create);
router.route("/me/group").get(authMiddleware, groupController.findAll);
router.route("/me/group/:_id").get(authMiddleware, groupController.find);

router
  .route("/me/group/:_id/members")
  .get(authMiddleware, groupController.members);
router
  .route("/me/group/:_id/members/invite/:_guestId")
  .post(authMiddleware, groupController.sendInvitation);
router.route("/group/:_id/invite").get(groupController.acceptInvitation);
module.exports = router;
