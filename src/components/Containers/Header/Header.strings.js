import {capitalize, evaluate} from '../../../utils';

export const CHAIN_TXT = chainName => capitalize(evaluate('{{chainName}} testnet', {chainName}));
