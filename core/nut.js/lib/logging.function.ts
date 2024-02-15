import { LogProviderInterface } from "@nut-tree/provider-interfaces";
import {
  ConsoleLogLevel,
  ConsoleLogProvider,
  ConsoleLogProviderConfig
} from "./provider/log/console-log-provider.class";
import providerRegistry from "./provider/provider-registry.class";

export const useLogger = (logger: LogProviderInterface) => {
  providerRegistry.registerLogProvider(logger);
};

export const useConsoleLogger = (config?: ConsoleLogProviderConfig) => {
  providerRegistry.registerLogProvider(new ConsoleLogProvider(config));
};

export { ConsoleLogLevel };
