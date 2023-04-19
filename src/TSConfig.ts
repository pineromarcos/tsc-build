export interface TSConfig {
    compilerOptions: TSConfigCompilerOptions;
    references: Array<TSConfigReference>;
}

export interface TSConfigReference {
    path: string;
    command?: string
    tsconfig?: string
}

export interface TSConfigCompilerOptions {
    baseUrl: string;
}