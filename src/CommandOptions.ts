export interface CommandOptions {
    tsConfig: string;
    tsOnlyReferences: boolean;
    lint: boolean;
    lintConfig: string;
    lintIgnorePath: string;
    lintFolder: string;
    srcFolder: string;
    watch: boolean,
    inspect: number;
}