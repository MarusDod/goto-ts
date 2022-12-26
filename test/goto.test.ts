import { Goto, withGoto } from "../src"


describe('goto',() => {
    it('hello',() => {
    let a = 1

    let fn = new Goto<number>()
        .label("1",goto => {
        })
        .label("2",goto => {
            if(a++ < 10){
                goto("1")
            }
        })
        .label("3",(goto,_return) => {
            _return(3)
        })
        .toFunction()

    fn()
        .then(b => expect(b).toEqual(3))
        .catch(err => fail('heh'))
    }),

    it('return sooner',() => {
        let fn = new Goto<number>()
            .label("1",(_,_return) => _return(2))
            .label("2",() => {})
            .toFunction()

        fn()
            .then(b => expect(b).toEqual(2))
            .catch(err => fail('heh'))
    })

    it('with object',() => {
        const a: string[] = []

        withGoto({
            'abc': goto => {
                a.push('abc')
                goto('cde')
            },
            'bcd': (_,_return) => {
                a.push('bcd')
                _return(null)
            },
            'cde': goto => {
                a.push('cde')
                goto('bcd')
            }
        })
        .then(() => {
            expect(a).toHaveLength(3)
            expect(a[0]).toEqual('abc')
            expect(a[1]).toEqual('cde')
            expect(a[2]).toEqual('bcd')
        })
    })
})