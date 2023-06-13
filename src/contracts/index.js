import Web3 from 'web3'
import { abi as ERC20Abi } from '@/contracts/abi/ERC20.json'
import { abi as CyberHarborMembershipAbi } from '@/contracts/abi/CyberHarborMembership.json'
import CONTRACT_ADDRESS from '@/contracts/address'
import { rpcConfig } from '@/config/web3'

const rpcUrlMap = {}
for (let key in rpcConfig) {
    const id = rpcConfig[key].expectedNetworkId
    rpcUrlMap[id] = rpcConfig[key].rpcUrls[0]
}

// 没有连接钱包也可以调用的查询方法
export const _CyberHarborERC20 = (networkId) => {
    const web3 = new Web3(rpcUrlMap[networkId])
    return new web3.eth.Contract(
        ERC20Abi,
        CONTRACT_ADDRESS[networkId]?.ERC20
    )
}

export const _CyberHarborMembership = (networkId) => {
    const web3 = new Web3(rpcUrlMap[networkId])
    return new web3.eth.Contract(
        CyberHarborMembershipAbi,
        CONTRACT_ADDRESS[networkId]?.CyberHarborMembership
    )
}

// 必须连接钱包才能调用的方法
export async function setUpContracts() {
    const ERC20 = (networkId) => {
        return new window.web3.eth.Contract(
            ERC20Abi,
            CONTRACT_ADDRESS[networkId]?.ERC20
        )
    }

    const CyberHarborMembership = (networkId) => {
        return new window.web3.eth.Contract(
            CyberHarborMembershipAbi,
            CONTRACT_ADDRESS[networkId]?.CyberHarborMembership
        )
    }

    return {
        ERC20,
        CyberHarborMembership
    }
}
