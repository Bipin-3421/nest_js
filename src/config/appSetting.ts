import { config } from 'dotenv';
config();
export const appSetting = {
  port: process.env.PORT,
  password: process.env.PASSWORD,
};
