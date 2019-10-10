import { exec } from "child_process"
import { promisify } from "util";

export const execAsync = promisify(exec);

export const gitlabRegistryLogin = async () =>{
  try {
    await execAsync(`docker login registry.$GITLAB_SERVER --username $GITLAB_USERNAME --password $GITLAB_TOKEN`);
  } catch (e) {
    console.error('Docker registry login', e)
  }
}
