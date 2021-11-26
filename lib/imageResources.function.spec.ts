import {loadImageResource} from "./imageResources.function";
import {mockPartial} from "sneer";
import {ProviderRegistry} from "./provider/provider-registry.class";
import {ImageReader} from "./provider";
import {join} from "path";

const loadMock = jest.fn();
const providerRegistryMock = mockPartial<ProviderRegistry>({
    getImageReader(): ImageReader {
        return mockPartial<ImageReader>({
            load: loadMock
        });
    }
});

describe('imageResources', () => {
    it('should retrieve an ImageReader via providerRegistry and load an image relative to the provided resourceDirectory', async () => {
        // GIVEN
        const resourceDirectoryPath = '/foo/bar';
        const imageFileName = "image.png";

        // WHEN
        await loadImageResource(providerRegistryMock, resourceDirectoryPath, imageFileName);

        // THEN
        expect(loadMock).toBeCalledWith(join(resourceDirectoryPath, imageFileName));
    });
});