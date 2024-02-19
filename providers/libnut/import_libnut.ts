import ln from "./libnut";

const libnut: typeof ln = (process.platform === 'win32') ?
    require("@nut-tree/libnut-win32") :
    (process.platform === 'linux') ?
        require("@nut-tree/libnut-linux") :
        require("@nut-tree/libnut-darwin")

export {
    libnut,
}