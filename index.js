import app from "./app.js";
import { connectDB } from "./db.js";

app.listen(3000, () => console.log("server running on port 3000"));
connectDB();
