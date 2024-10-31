const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {config} = require('../config/config');

const UserService = require('./user.service');
const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    console.log(password, user)
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw boom.unauthorized('Invalid password');
    }

    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendPasswordRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const link = `${config.frontendUrl}/reset-password?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });
    const template = {
      from: `Open Store <${config.smtpUser}>`,
      to: email,
      subject: 'Recovery password from Open Store',
      text: `You have 15 min to recover your password. Please go to the following link to recover your password ${link}`,
    }

    const res = await this.sendMail(template);
    return res;
  }

  async changePassword(token, newPassword) {
    try{
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'Password changed' };

    }
    catch(e){
      console.log(e)
      throw boom.unauthorized();
    }
  }

  async sendMail(infoEmail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      auth: {
          user: config.smtpUser,
          pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoEmail);
    return { message: 'Email sent' };
  }
}

module.exports = AuthService;
