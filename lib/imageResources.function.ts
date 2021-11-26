import {join, normalize} from "path";
import {ProviderRegistry} from "./provider/provider-registry.class";

export function loadImageResource(providerRegistry: ProviderRegistry, resourceDirectory: string, fileName: string) {
    const fullPath = normalize(join(resourceDirectory, fileName));
    return providerRegistry.getImageReader().load(fullPath);
}