import { cleanEnv, str, url } from "envalid"
import logger from "../utils/logger"

export class DotEnvValidationService {
    validateDotEnvFile() {
        logger.info("[DotEnvValidationService] Validating .env")
        cleanEnv(
            process.env,
            {
                NODE_ENV: str({ choices: ["development", "test", "production"] }),
                MONGODB_URI: url(),
            },
            {
                reporter: ({ errors }: { errors: object; env: any }) => {
                    const errorKeys = Object.keys(errors)
                    if (errorKeys.length > 0) {
                        logger.error(`[DotEnvValidationService] Invalid env vars found! Starting with degraded performance!`)
                        for (const errorKey of errorKeys) {
                            logger.error(`[DotEnvValidationService] Name: ${errorKey} ${errors[errorKey]}`)
                        }
                    }
                },
            }
        )
    }
}

export default new DotEnvValidationService()