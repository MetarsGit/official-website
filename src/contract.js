import { abi as MultiCallAbi, networks as MultiCallNetworks} from '@/contracts/abi/MultiCall.json';
import { abi as YuanguAbi, networks as YuanguNetworks} from '@/contracts/abi/YuanguLike.json';
import { networkConfig } from "@/config";

const networkId = networkConfig.expectedNetworkId.toString();

export async function setUpContracts(web3) {
    const multiCallAddress = MultiCallNetworks[networkId]?.address
    const MultiCall = new web3.eth.Contract(MultiCallAbi, multiCallAddress);
    const YuanguAddress = YuanguNetworks[networkId]?.address
    const Yuangu = new web3.eth.Contract(YuanguAbi, YuanguAddress);
  return {
      MultiCall,
      Yuangu
  }
}