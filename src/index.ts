import fastify from 'fastify';
import fs from 'fs';
import {promisify} from 'util';
import { exec } from 'child_process';
import { IS_DEV, PORT, HOST, APP_ROOT, GITLAB_TOKEN, GITLAB_USERNAME, GITLAB_SERVER, DEPLOY_TOKEN} from './config';
import { gitlabRegistryLogin, execAsync } from './gitlab';

const server = fastify({
  logger: IS_DEV
});

const exists = promisify(fs.exists);

gitlabRegistryLogin();

server.get('/deploy/:token/:app', async (request, reply) => {
  const { app, token } = request.params;
  const appPath = `${APP_ROOT}/${app}`

  if (token !== DEPLOY_TOKEN) {
    return;
  }

  try {
    const isExists = await exists(`${appPath}/.git`);
    const gitCommand = isExists ? `cd ${appPath} && git pull -f` :
      [
        `cd ${APP_ROOT}`,
        `git clone https://${GITLAB_USERNAME}:${GITLAB_TOKEN}@${GITLAB_SERVER}/${GITLAB_USERNAME}/${app}.git`,
        `cd ${app}`
      ].join('&&')
    await execAsync(gitCommand)

    const command = [`cd ${appPath}`, 'docker-compose down', 'docker-compose pull', 'docker-compose up -d'].join('&&')
    await execAsync(command);
    reply.code(200)
  } catch (e) {
    reply.code(500)
  }

  reply.send("")
})

server.listen(PORT, HOST, (err, address) => {
  if (err) throw err
  server.log.info(`server listening on ${address}`)
})