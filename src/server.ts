import { app } from "./app"

const PORT = 3333

// biome-ignore lint/suspicious/noConsole: required by Express controllers naming convention
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
