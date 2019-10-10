
import dotenv from 'dotenv';
dotenv.config()

const { env } = process;

export const NODE_ENV = env.NODE_ENV;
export const IS_DEV = env.NODE_ENV !== 'production'
export const PORT = +env.PORT!;
export const HOST = env.HOST!;
export const APP_ROOT = '/app_root';
export const GITLAB_TOKEN = env.GITLAB_TOKEN
export const GITLAB_SERVER = env.GITLAB_SERVER
export const GITLAB_USERNAME = env.GITLAB_USERNAME
export const DEPLOY_TOKEN = env.DEPLOY_TOKEN