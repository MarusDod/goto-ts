# GOTO-TS

`goto` in typescript/javascript because we've all been missing it and also why not.

```ts
    import { Goto } from "../src"

    let a = 1

    const fn = new Goto<number>()
        .label("1",() => {
            console.log("hello 1")
        })
        .label("2",goto => {
            console.log("hello 2")

            if(a++ < 10){
                goto("1")
            }
        })
        .label("3",(_,_return) => {
            console.log("hello 3")
            _return(a)
        })
        .toFunction()

    fn()
        .then(b => b === 10 //true)
```

```ts
    import { withGoto } from "../src"

    const fn = (x: number) => {
        let a = 2

        withGoto({
            'abc': goto => {
                a++
                goto('cde')
            },
            'bcd': (_,_return) => {
                a++
                _return(null)
            },
            'cde': goto => {
                a++
                goto('bcd')
            }
        })
    
        return a //5
    }
```

More to come soon...