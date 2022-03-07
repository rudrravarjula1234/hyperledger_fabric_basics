import { Contract, Gateway, Network, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import { promises } from 'dns';
import { AsyncResource } from 'async_hooks';

async function main() {
    try {
        var result: Buffer | undefined;
        let gateway:Gateway | undefined;     
        let network:Network | undefined;    
        let contract: Contract | undefined;
        await getGateway().then((x)=> gateway = x );
        if(!!gateway){
            await getNetwork(gateway).then((x) => network = x);
        }
        if(!!network){
            await getContract("CarDeler",network).then((x) => contract = x);
        }
        if(contract){
            result = await submitTransaction(contract,"getAllVehicles");
            console.log("SAd");
            return result.toString();
        }
        if(!!gateway)
            await DissconnectGatewoy(gateway)

    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
}
async function getGateway(): Promise<Gateway | undefined> {
    const walletPath = path.join(process.cwd(), 'Org');
    console.log(walletPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    const connectionProfilePath = path.resolve(__dirname, '..','connection.json');
    const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslintdisable-line @typescript-eslint/no-unsafe-assignment
    const connectionOptions = {
        wallet, identity: 'Org1 Admin', discovery:
            { enabled: true, asLocalhost: true }
    };
    await gateway.connect(connectionProfile, connectionOptions);
    return gateway;
    
}
async function getNetwork(gateway:Gateway): Promise<Network> {
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    return network;
}
async function getContract(contractName:string,network?: Network ): Promise<Contract | undefined> {
    if(network){
        const contract = network.getContract(contractName);
        return contract;
    }
}
async function submitTransaction(contract: Contract, transactionName:string, args: string[] = []): Promise<Buffer> {
    try {
       
        let x = await contract.submitTransaction(transactionName,...args);
        console.log('Transaction has been submitted');
        // Disconnect from the gateway.
        console.log(x.toString())
        return x;
    } catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
}
async function DissconnectGatewoy(gateway:Gateway) {
    gateway.disconnect();
}
interface trasactionObj{
    brand:string;
    capacity:number;
    model:string;
    name:string;
    owner:string;
}
export {main};
void main();