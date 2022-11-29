const sum = require("./test");
import { render, screen } from "@testing-library/react";
import App from "./App";

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

//   test('just testing for',()=>{
//     let data=10;
//     expect(data).toBe(10)
//   })

// object check
// it('check object',()=>{
//     let data=sum()
//     expect(data).toEqual({name:"test"})
// })

// it('test parse',()=>{
//     let result=sum('10','2')
//     expect(result).toBe(12)
// })

test("test button", () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {
    name: "Sae Button"
  });
  expect(buttonElement).toBeInTheDocument();
});
