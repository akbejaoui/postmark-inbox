import logger from "./logger"

export const extractErrorMessage = (error: any) => {
    let errorMessage = ""

    // see if it's a HTTP error
    if (error.response) {
        errorMessage += `${error.response.status} - ${error.response.statusText}`
        const { data } = error.response
        if (data) {
            errorMessage += ` Data: ${JSON.stringify(data)}`
        }
    } else {
        // if not stringify for objects or just copy the normal error message
        errorMessage = typeof error === "object" ? JSON.stringify(error) : error
    }

    // last resort
    if (errorMessage === "" || errorMessage === "{}") {
        errorMessage = JSON.stringify(error, Object.getOwnPropertyNames(error))
    }

    return errorMessage
}

export const issueAlert = (message: string, type: "warn" | "error" = "warn") => {
    const alertMessage = `[ALERT] - ${message}`
    if (type === "warn") logger.warn(alertMessage)
    else logger.error(alertMessage)
}
