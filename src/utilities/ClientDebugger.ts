class ClientDebugger {
    private keys: Map<string, any>;
    constructor() {
        this.keys = new Map();
    }

    public set(key: string, value: any) {
        this.keys.set(key, value);
    }
}

export default ClientDebugger;
