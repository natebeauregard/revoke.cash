import {
  CHAIN_SELECT_TESTNETS,
  getChainName,
  getChainNativeToken,
  getChainSlug,
  getCorrespondingMainnetChainId,
} from 'lib/utils/chains';
import useTranslation from 'next-translate/useTranslation';
import { createElement } from 'react';

interface Props {
  chainId: number;
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// TODO: Add FAQ structured data
const ChainDescription = ({ chainId, headingElement }: Props) => {
  const { t } = useTranslation();

  const mainnetChainId = getCorrespondingMainnetChainId(chainId) ?? chainId;
  const isTestnet = CHAIN_SELECT_TESTNETS.includes(chainId);
  const isCanary = !isTestnet && chainId !== mainnetChainId;

  const mainnetChainSlug = getChainSlug(mainnetChainId);
  const mainnetChainName = getChainName(mainnetChainId).replace(' (Unsupported)', '');
  const chainName = getChainName(chainId).replace(' (Unsupported)', '');
  const nativeToken = getChainNativeToken(chainId);

  console.log('mainnetChainSlug', mainnetChainSlug);

  const hasDescription = !!t(`networks:networks.${mainnetChainSlug}`, null, { default: null });
  if (!hasDescription) return null;

  return (
    <>
      {!!headingElement && createElement(headingElement, {}, t('networks:title', { chainName }))}
      <p>
        {isTestnet && <span>{t(`networks:is_testnet`, { chainName, mainnetChainName }, { default: null })} </span>}
        <span>
          {isCanary
            ? t('networks:canary_network', { chainName, mainnetChainName })
            : t(`networks:networks.${mainnetChainSlug}`)}{' '}
          {t(`networks:native_token`, { chainName, nativeToken })}
        </span>
      </p>
    </>
  );
};

export default ChainDescription;
