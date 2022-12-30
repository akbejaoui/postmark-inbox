import * as dotenv from "dotenv"

/**
 * Load environment variables from .env file
 */
dotenv.config()

// NODE_ENV
export const nodeEnv = process.env.NODE_ENV
export const isTest = process.env.NODE_ENV === "test"
export const isDev = process.env.NODE_ENV === "development"


// DB
export const mongoDbUri = process.env.MONGODB_URI
export const mongoConnectTimeOut = process.env.MONGO_CONNECT_TIMEOUT_MS ? Number(process.env.MONGO_CONNECT_TIMEOUT_MS) : undefined

export const maskUrl = (url: string) => {
    try {
        const urlObject = new URL(url)
        if (!urlObject.password) return url
        return `${urlObject.protocol}//****:****@${urlObject.host}${urlObject.pathname}?${urlObject.searchParams}`
    } catch (err) {
        return url
    }
}
