import React from 'react';

import StarkNetLogoPath from '../../../assets/img/starknet.png';
import {ChainType, NetworkType} from '../../../enums';
import {
  useWallets,
  useEthereumWallet,
  useStarknetWallet
} from '../../../providers/WalletsProvider/hooks';
import {toClasses} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {useIsEthereum, useIsStarknet} from '../../Features/Transfer/Transfer/Transfer.hooks';
import {WalletButton} from '../../UI';
import {STARKNET_LOGO_SIZE} from './Header.constants';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName} = useWallets();
  const {showAccountMenu} = useBridgeActions();
  const [, setEthereum] = useIsEthereum();
  const [, setStarknet] = useIsStarknet();
  const {
    account: ethereumAccount,
    isConnected: isEthereumConnected,
    config: ethereumConfig
  } = useEthereumWallet();
  const {
    account: starknetAccount,
    isConnected: isStarknetConnected,
    config: starknetConfig
  } = useStarknetWallet();

  const onStarknetWalletButtonClick = () => {
    setStarknet();
    showAccountMenu();
  };

  const onEthereumWalletButtonClick = () => {
    setEthereum();
    showAccountMenu();
  };

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')}>
          <img alt="" height={STARKNET_LOGO_SIZE} src={StarkNetLogoPath} />
          <div className={styles.bridge}>Bridge</div>
        </div>
        {chainName && (
          <div className={toClasses(styles.chain, 'row')}>
            {chainName !== ChainType.MAIN.name && CHAIN_TXT(chainName)}
          </div>
        )}
      </div>

      <div className={toClasses(styles.right, 'row')}>
        {isEthereumConnected && (
          <WalletButton
            account={ethereumAccount}
            logoPath={ethereumConfig?.logoPath}
            onClick={onEthereumWalletButtonClick}
          />
        )}
        {isStarknetConnected && (
          <WalletButton
            account={starknetAccount}
            logoPath={starknetConfig?.logoPath}
            onClick={onStarknetWalletButtonClick}
          />
        )}
      </div>
    </div>
  );
};
