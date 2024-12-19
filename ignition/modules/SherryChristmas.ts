import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SherryChristmasModule = buildModule("SherryChristmas", (m) => {
    const sherry = m.contract("SherryChristmas", []);

    return { sherry };
 });

export default SherryChristmasModule;