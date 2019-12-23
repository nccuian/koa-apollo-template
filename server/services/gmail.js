import nodemailer from "nodemailer"
import config from '../config'
import EmailTemplate from '../helper/emailtemplate'
// import EmailHelper from './email'

export default class GmailHelper {
  constructor() {
    this.smtpTransport = nodemailer.createTransport({
      service: config.mail.service,
      auth: {
        type: 'OAuth2',
        ...config.mail.auth.XOAuth2
      }
    })
  }
  async sendPlaceOrder(email ,orderId){
    
    const dbOrder = await db.Order.findOne({
      where: {
        id: orderId
      },
      include: [{
        model: db.Country
      }, {
        model: db.OrderDetail
      }]
    })
    let language = 'en'
    language = dbOrder.language.toLowerCase() || language
    let i18n = require(`../helper/i18n/${language}`).default
    let mailOptions = {
      from: "",
      to: email,
      subject: ``,
      generateTextFromHTML: true,
      html: ''
    }
    this.smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    });
    
  }
}
