// import Oauth2Service from './oauth2'
import JWTService from './jwt'
import GmailService from './gmail'


export default class Services {
  constructor () {
    // this.oauth2Service = new Oauth2Service()
    this.jwtService = new JWTService()
    this.gmailService = new GmailService()
  }
}
