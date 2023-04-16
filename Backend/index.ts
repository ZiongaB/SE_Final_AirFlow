//   <!-- Sebastian Mark -->
// function with types 
import express, {Express, Request, Response} from 'express'
import * as dotenv from 'dotenv'

dotenv.config();
console.log(process.env.PORT)

// app is of type express 
const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    // back ticks here 
    console.log(`Example app listening on port ${port}`)
})

//   <!-- Sebastian Mark -->