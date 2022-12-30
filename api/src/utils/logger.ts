// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require("chalk")

export default class Logger {
    public static log = (args: any) => this.info(args)
    public static debug = (args: unknown) => console.debug(chalk.green(`[${new Date().toLocaleString()}] [DEBUG] `), typeof args === "string" ? chalk.greenBright(args) : args)
    public static info = (args: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `), typeof args === "string" ? chalk.blueBright(args) : args)
    public static warn = (args: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `), typeof args === "string" ? chalk.yellowBright(args) : args)
    public static error = (args: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `), typeof args === "string" ? chalk.redBright(args) : args)
}
