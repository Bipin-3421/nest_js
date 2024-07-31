import { config } from 'dotenv';
config();
export const appSetting = {
  port: process.env.PORT,
  password: process.env.PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
};
console.log(appSetting.port);
