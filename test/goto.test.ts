import { Goto } from "../src"

let a = 1

describe('goto',() => {
    it('hello',() => {
    let fn = new Goto<number>()
        .label("1",(goto,_return) => {
            console.log("hello 1")
        })
        .label("2",goto => {
            console.log("hello 2")

            if(a++ < 10){
                goto("1")
            }
        })
        .label("3",(goto,_return) => {
            console.log("hello 3")
            _return(3)
        })
        .toFunction()

    fn()
        .then(b => expect(b).toEqual(3))
        .catch(err => fail('heh'))
    })
})