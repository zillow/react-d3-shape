import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.config.includeStack = true;
chai.use(sinonChai);

global.chai = chai;
global.expect = expect;
