/* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import app from "./app.js";
import envConfig from "./config/env.js";

function bootstrap() {
  try {
   app.listen(envConfig.PORT, () => {
      console.log(`PH Health care running on port 5000 ${envConfig.PORT}`);
    });
  } catch (error) {
    console.log("failed to start the server", error);
  }
}

bootstrap();
