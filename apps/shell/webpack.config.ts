import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default withModuleFederation(config, { dts: false }).then((mfConfig) => ({
  ...mfConfig,
  output: {
    ...mfConfig.output,
    scriptType: 'text/javascript',
  },
}));
