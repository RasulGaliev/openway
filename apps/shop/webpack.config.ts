import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default withModuleFederation(config, { dts: false }).then((mfConfig) => ({
  ...mfConfig,
  devServer: {
    port: 4202,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}));
