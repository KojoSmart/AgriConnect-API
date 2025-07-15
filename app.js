
const express = require("express");
const cors = require("cors")
require("dotenv").config(); //
const connectDB = require("./config/dbConfig")
const EquipmentRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const bookingRoute = require("./routes/bookingRoutes")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");


const app = express();
app.use(express.json());
app.use(cors())



app.use("/api/auth", userRoute);
app.use("/createProduct", EquipmentRoute);
app.use("/bookEquip", bookingRoute)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 7002;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.log("Failed to connect to mongodb", error.message);
    process.exit(1);
  }
};
startServer();