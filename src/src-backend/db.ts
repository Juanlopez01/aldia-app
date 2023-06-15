import { connect, connection, disconnect } from "mongoose";
import { config } from "dotenv";
config();

const conn: any = {
  isConnected: false,
};

export function dbConnect() {
  if (conn.isConnected) return;

  const db = connect(process.env.MONGO_URI!).then((result : any) => {
    conn.isConnected = result.connections[0].readyState
  })
}

connection.on("connected", () => {
  console.log("Database connected");
});
connection.on("disconnected", () => {
  console.log("Database disconnected");
});
connection.on("error", (err) => {
  console.log(err);
});
// const conn = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     console.log("database connected");
//   } catch (error: any) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

export default dbConnect;
