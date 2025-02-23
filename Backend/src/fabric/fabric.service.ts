import { Injectable, Logger } from '@nestjs/common';
import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FabricService {
    private readonly logger = new Logger(FabricService.name);
    private ccpPath: string;
    private walletPath: string;
    private gateway: Gateway;

    constructor() {
        this.ccpPath = path.resolve(__dirname, '..', 'fabric-network', 'connection-org1.json');
        this.walletPath = path.join(process.cwd(), 'wallet');
        this.gateway = new Gateway();
    }

    async init() {
        try {
            const ccp = JSON.parse(fs.readFileSync(this.ccpPath, 'utf8'));
            const wallet = await Wallets.newFileSystemWallet(this.walletPath);

            const userExists = await wallet.get('appUser');
            if (!userExists) {
                this.logger.error('An identity for the user "appUser" does not exist in the wallet');
                throw new Error('An identity for the user "appUser" does not exist in the wallet');
            }

            await this.gateway.connect(ccp, {
                wallet,
                identity: 'appUser',
                discovery: { enabled: true, asLocalhost: true },
            });
        } catch (error) {
            this.logger.error(`Failed to initialize Fabric client: ${error}`);
            throw error;
        }
    }

    async submitTransaction(contractName: string, transactionName: string, ...args: string[]) {
        try {
            const network = await this.gateway.getNetwork('mychannel');
            const contract = network.getContract(contractName);
            const result = await contract.submitTransaction(transactionName, ...args);
            return result.toString();
        } catch (error) {
            this.logger.error(`Failed to submit transaction: ${error}`);
            throw error;
        }
    }

    async evaluateTransaction(contractName: string, transactionName: string, ...args: string[]) {
        try {
            const network = await this.gateway.getNetwork('mychannel');
            const contract = network.getContract(contractName);
            const result = await contract.evaluateTransaction(transactionName, ...args);
            return result.toString();
        } catch (error) {
            this.logger.error(`Failed to evaluate transaction: ${error}`);
            throw error;
        }
    }

    async disconnect() {
        this.gateway.disconnect();
    }
}