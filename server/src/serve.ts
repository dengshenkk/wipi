import app from "./App";

const PORT: number = 3000;

console.log(process.env.NODE_ENV);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
