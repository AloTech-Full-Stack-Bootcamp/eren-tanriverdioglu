import nodemailer from 'nodemailer';
import Course from '../models/Course.js';
import User from '../models/User.js';

const getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.countDocuments();
  const totalStudents = await User.countDocuments({role:'student'});
  const totalTeachers = await User.countDocuments({role:'teacher'});
  res.status(200).render('index', {
    pageName: 'index',
    courses:courses,
    totalCourses:totalCourses,
    totalStudents:totalStudents,
    totalTeachers:totalTeachers
  })
}

const getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about'
  })
}

const getContactPage = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact'
  })
}

const getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register'
  })
}

const getLoginPage = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login'
  })
}

const sendEmail = async (req, res) => {
  try{
    const outputMessage = `
    <h3>Mail Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_ACC, // gmail account
        pass: process.env.GMAIL_PASS, // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smartedu Contact Form" <erentnr17@gmail.com>', // sender address
      to: "erentnr@yandex.com", // list of receivers
      subject: "1 new message ✔", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    req.flash("success", "We received your message succesfully");
    res.status(200).redirect('/contact')
  }catch(error){
    req.flash("error", `Something happened!`);
    res.status(200).redirect('contact');
  }
}

export {
  getIndexPage,
  getAboutPage,
  getContactPage,
  getRegisterPage,
  getLoginPage,
  sendEmail
}
