import express from "express";
import authRoute from "./routes/authRoute";
import appSettingRoute from "./routes/appSettingRoute";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/bet', appSettingRoute)

app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})