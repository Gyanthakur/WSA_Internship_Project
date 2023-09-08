const crypto = require('crypto');
const User = require('../model/userModel');
const transporter = require('./../config/emailConfig');
const { orderCompleteMail } = require('./../config/mailGen');

const orderController = async (req, res) => {
  const { id } = req.body;
  const orderListNew = req.body.orderList;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: `User doesn't exists!`,
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        status: 'fail',
        message: `Please verify your account to place order!`,
      });
    }
    const randomString = crypto.randomBytes(8).toString('hex');
    await User.updateOne(
      { _id: id },
      {
        orderList: [
          ...user.orderList,
          { list: orderListNew, orderNo: randomString, date: new Date() },
        ],
      }
    );

    // const link = `${process.env.RESET_PASSWORD_HOST}/account`;

    const emailBody = orderCompleteMail(user, orderListNew, randomString);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Swiggy Clone: Order confirmation email!',
      html: emailBody,
    });

    res.status(200).json({
      status: 'success',
      message: 'Order placed successfully!',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

module.exports = { orderController };
