const rpcConfig = {
    ETHEREUM: {
        chainSymbol: 'Ethereum',
        expectedNetworkId: '1',
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        currencyName: 'ETH',
        currencySymbol: 'ETH',
        currencyDecimals: 18,
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerName: 'Etherscan',
        blockExplorerUrls: ['https://etherscan.io']
    },
    BSC: {
        chainSymbol: 'BSC',
        expectedNetworkId: '56',
        chainId: '0x38',
        chainName: 'Binance Smart Chain Mainnet',
        currencyName: 'BNB',
        currencySymbol: 'BNB',
        currencyDecimals: 18,
        rpcUrls: ['https://bsc.nodereal.io'],
        blockExplorerName: 'Bscscan',
        blockExplorerUrls: ['https://bscscan.com/']
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
