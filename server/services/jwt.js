import jwt from 'jsonwebtoken'
import config from '../config/index'


export default class JsonWebToken {
  sign({payload, expiresIn}){
    return jwt.sign(payload, config.jwtKey.key, { expiresIn: expiresIn })
  }
  verifyAndReturnPayload(token) {
    try{
      const payload = jwt.verify(token, config.jwtKey.key)
      delete payload['iat']
      delete payload['exp']
      return payload
    }catch(e) {
      return null
    }
  }  
};
