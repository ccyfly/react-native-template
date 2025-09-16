export interface ISystemInfoData {
  env?: string
  team?: string
  sessionTimeout?: number
  secKey?: string
  version?: string
}

export class SystemInfo {
  public static data: ISystemInfoData = {
    env: 'PRD',
    team: 'Cms',
    sessionTimeout: 3600,
    secKey: '-----BEGIN PUBLIC KEY-----\nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA4o7iA/kr5qFDzfkIJH6k\nONynGjefJESnQk+NFLtxFHmENLDObtCA0+u72pvJ0RCbxyth69aNDQ1mehlRxwc6\nPiQhNOcf2U58Pu98/QzXWixVGa3mWXBDZ5ci511ECUEt3Olh587VPmRk8F0m92dT\nh/fqGARPQ+bvsFWjEptXTbEQ1qlVIjTY1cmwsRrMr+DLA9VSLrFWsmuDMyBR0Gj7\n+yZ0oxAcUFgfvTDwyDgFrpiM4iAQt9OefrTFjcyyZC5zgAjdrqOJCjgnbdE5lgdL\naGIwIKbB1WIVrsFelfTJ15iz73ml/aP9Op/+ylWBpLzPHkROy57NRiii1NSudzeX\n/h9Kb8avynZEyjCgGPqPT0I7OYkaRZER8ylFpShNrXJijZXl97joeUOjOSuQzwAW\nSgt+dSTUr5u4Q8nGe4qD1XhZpwK4rgOkMVMOwfjsTmByERqogypdxKfGhslR6gZG\nmrqI6G15DXFK2E2Zcr0SJhY6Sx2LF1twFdvnD4sarGyjAgMBAAE=\n-----END PUBLIC KEY-----\n',
    version: '1.0.0 (0)',
  } // assigned by core.service.initializr()
}
