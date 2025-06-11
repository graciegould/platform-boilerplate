import { coreLogic } from "platform-core";

console.log("[platform-ui] ready");

export const uiComponent = () => `Hello from platform-ui, which uses: [${coreLogic()}]`; 