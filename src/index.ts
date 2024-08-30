// // interface User {
// // 	name: string;
// // 	age: number;
// //     email: string,
// //     id: string,
// //     password: string
// // }


// // // Pick 
// // type updateProps = Pick<User, 'name' | 'age' | 'email'>

// // function updateUser(updateProps: updateProps){

// // }

// // // Partial : every field is optional 

// // type updatePropsOtional = Partial<updateProps>

// // function updateUseroption(updatePropsOtional: updatePropsOtional){

// // }


// // // Read Only

// // const usser: Readonly<User2> = {
// //     name: 'om',
// //     age: 19
// // }
// // type User2 = {
// //      name: string,
// //      age: number
// // }

// //Record : cleaner syntaxand. Maps
// // type User3 = {
// //     id: number,
// //     name: string
// // }

// // type Users = {
// //     [key: string] : User3
// // }

// // type Users = Record<string, {name: string, id:number}>
// const user: Users = {
//     "_1":{
//         name: ' oM',
//         id: 1
//     },
//     "_2":{
//         name: ' oM',
//         id: 2
//     },
// }

// //map 

// // const user2 = new Map<string, Users>()
// // user2.set( "_1" ,{
// //     name: ' oM',
// //     id: 1
// // })
// // user2.set( "_2",{
// //     name: ' oM',
// //     id: 1
// // })
// type Users = Record<string, { name: string; id: number }>;

// const user2 = new Map<string, Users>();

// user2.set("_1", {
//   user1: { name: "oM", id: 1 },
// });

// user2.set("_2", {
//   user2: { name: "oM", id: 1 },
// });


// interface User {
//     id: string;
//     name: string;
//   }
  
//   // Initialize an empty Map with string keys and User values
//   const usersMap = new Map<string, User>();
  
//   // Add users to the map using .set
//   usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
//   usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
  
//   // Accessing a value using .get
//   console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }








//   type EventR = 'click' | 'scroll' | 'mousemove';

//   // Using Exclude to create a new type without 'scroll'
// type ExcludeEvent = Exclude<EventR, 'scroll'>; // 'click' | 'mousemove'

// // Function that accepts only 'click' and 'mousemove' events
// const handleEvent = (event: ExcludeEvent) => {
//   console.log(`Handling event: ${event}`);
// };

// handleEvent('click'); // OK
// handleEvent('scroll'); // Error: Argument of type '"scroll"' is not assignable to parameter of type 'ExcludeEvent'.





// ZOD INFERENCES 

import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.number().max(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  age: z.string().min(18, { message: "You must be at least 18 years old" }),
});

type FinalValue = z.infer<typeof userProfileSchema>

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);
const update: FinalValue = req.body
  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  // Type of updateBody is inferred from userProfileSchema
  const updateBody = result.data;

  // update database here
  res.json({
    message: "User updated",
    updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));