export interface CommandOptions {
    project: string;
    onlyReferences: boolean;
    lint: boolean;
    lintConfig: string;
    lintIgnorePath: string;
    watch: string,
    inspect: string;
}