import app from "./app";

let PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// if the Promise is rejected this will catch it
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
