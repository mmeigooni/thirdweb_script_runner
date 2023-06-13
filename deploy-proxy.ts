import { config } from "dotenv";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Arbitrum } from "@thirdweb-dev/chains";

config();

const chain = Arbitrum;
const testPrivateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY as string;

const main = async () => {
    if (!testPrivateKey) {
        throw new Error(
          "No test private key found."
        );
    }
    
    const cloneFactoryAddress = "0x76F948E5F13B9A84A81E5681df8682BBf524805E";
    console.log("Running on", chain.slug, "with clone factory", cloneFactoryAddress);
    
    const sdk = ThirdwebSDK.fromPrivateKey(testPrivateKey, chain);

    const cloneFactory = await sdk.getContract(cloneFactoryAddress);

    const tx = await cloneFactory.call(
        "deployProxyByImplementation", 
        [
            "0x50c921e598bdcb2a81ae2fad357798dfab322bb0", 
            "0xb1a14437000000000000000000000000c3f2b2a12eba0f5989cd75b2964e31d56603a2ce00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000037697066733a2f2f516d5950734a514e657a597473696f4b59376e467836613845564a5353334a32746f625a6648415068595771714b2f300000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d04f98c88ce1054c90022ee34d566b9237a1203c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c3f2b2a12eba0f5989cd75b2964e31d56603a2ce00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000002710", 
            "0x3736353737330000000000000000000000000000000000000000000000000000"
        ]
    );
    console.log("tx: ", tx);
}

main();