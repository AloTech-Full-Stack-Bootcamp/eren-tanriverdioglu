import express from 'express';
import {
  getIndexPage,
  getAboutPage,
  getContactPage,
  getRegisterPage,
  getLoginPage,
  sendEmail
} from '../controllers/pageController.js';
import redirectMiddleware from '../middlewares/redirectMiddleware.js';

const router = express.Router();

router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/contact').get(getContactPage);
router.route('/contact').post(sendEmail);
router.route('/register').get(redirectMiddleware, getRegisterPage);
router.route('/login').get(redirectMiddleware, getLoginPage);

export default router
