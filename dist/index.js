"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
;
// Example usage
const result = sumOfAge({
    name: "harkirat",
    age: 20
}, {
    name: "raman",
    age: 21
});
console.log(result); // Output: 41
