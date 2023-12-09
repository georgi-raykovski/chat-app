import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors())

export interface QueryPayload {
  foo: string;
}

app.get('/data', (req, res) => {
  const data: QueryPayload = { foo: 'bar' };
  res.json(data);
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
