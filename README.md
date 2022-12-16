# GOTO-TS

`goto` in typescript/javascript because we've all been missing it and also why the fuck not.

```ts
    let a = 1

    const fn = new Goto<number>()
        .label("1",() => {
            console.log("hello 1")
        })
        .label("2",() => {
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
        .then(b => b === 3 //true)
```

More to come soon...