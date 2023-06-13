const rpcConfig = {
    ETHEREUM: {
        chainSymbol: 'Ethereum',
        expectedNetworkId: '5',
        chainId: '0x5',
        chainName: 'Goerli Test Network',
        currencyName: 'ETH',
        currencySymbol: 'ETH',
        currencyDecimals: 18,
        rpcUrls: [
            'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        ],
        blockExplorerName: 'Etherscan',
        blockExplorerUrls: ['https://goerli.etherscan.io']
    },
    BSC: {
        chainSymbol: 'BSC',
        expectedNetworkId: '97',
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        currencyName: 'BNB',
        currencySymbol: 'BNB',
        currencyDecimals: 18,
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerName: 'Bscscan',
        blockExplorerUrls: ['https://testnet.bscscan.com']
    },
    POLYGON: {
        chainSymbol: 'Polygon',
        expectedNetworkId: '137',
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        currencyName: 'MATIC',
        currencySymbol: 'MATIC',
        currencyDecimals: 18,
        rpcUrls: ['https://polygon.llamarpc.com'],
        blockExplorerName: 'Polygonscan',
        blockExplorerUrls: ['https://polygonscan.com']
    }
}
module.exports = rpcConfig
