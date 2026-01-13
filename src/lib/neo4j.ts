import neo4j, { Driver } from 'neo4j-driver'

// Singleton driver instance
let driver: Driver | null = null

/**
 * Initialize Neo4j driver with AuraDB support
 * Supports both local (bolt://) and cloud (neo4j+s://) connections
 */
function initializeDriver(): Driver {
    if (!process.env.NEO4J_URI || !process.env.NEO4J_USER || !process.env.NEO4J_PASSWORD) {
        console.warn('Neo4j env vars not configured. Graph features will be unavailable.')
        // Return a mock driver that won't crash the app
        return {
            session: () => {
                throw new Error('Neo4j not configured')
            },
            close: async () => { },
        } as unknown as Driver
    }

    return neo4j.driver(
        process.env.NEO4J_URI,
        neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
        {
            maxConnectionPoolSize: 50,
            connectionAcquisitionTimeout: 60000, // 60 seconds
            encrypted: process.env.NEO4J_URI.startsWith('neo4j+s://') ? true : false,
        }
    )
}

/**
 * Get or create the singleton driver instance
 */
export function getDriver(): Driver {
    if (!driver) {
        driver = initializeDriver()
    }
    return driver
}

/**
 * Get a new session from the driver
 * Remember to close the session after use!
 */
export async function getSession() {
    return getDriver().session()
}

/**
 * Execute a read query with automatic session management
 */
export async function executeRead<T = any>(
    cypher: string,
    params: Record<string, any> = {}
): Promise<T[]> {
    const session = await getSession()
    try {
        const result = await session.executeRead((tx: any) => tx.run(cypher, params))
        return result.records.map((record: any) => record.toObject() as T)
    } finally {
        await session.close()
    }
}

/**
 * Execute a write query with automatic session management
 */
export async function executeWrite<T = any>(
    cypher: string,
    params: Record<string, any> = {}
): Promise<T[]> {
    const session = await getSession()
    try {
        const result = await session.executeWrite((tx: any) => tx.run(cypher, params))
        return result.records.map((record: any) => record.toObject() as T)
    } finally {
        await session.close()
    }
}

/**
 * Close the driver connection (for graceful shutdown)
 */
export async function closeDriver() {
    if (driver) {
        await driver.close()
        driver = null
    }
}

export default getDriver()
