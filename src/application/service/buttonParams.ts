import { ButtonParams } from "../../types.js";
import { buttonCommandParamSplitter } from "../../settings.js";

export function getButtonParams(customId: string): ButtonParams {
    const [name, param] = customId.split(buttonCommandParamSplitter)
    return {
        name,
        param,
    }
}
