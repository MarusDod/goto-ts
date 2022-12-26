type GotoFn<T> = (goto: (name: string) => void,_return: (x?: T) => void) => any

export class Goto<T> {
    private fns: Record<string,GotoFn<T>>

    constructor(body?: Record<string,GotoFn<T>>) {
        this.fns = body ?? {}
    }

    toFunction(): () => Promise<T | undefined> {
        return () => this.run()
    }

    label(name: string,fn: GotoFn<T>){
        this.fns[name] = fn

        return this
    }

    run(): Promise<T | undefined>{
        return this.runIndex(0)
    }

    private runLabel(label: string): Promise<T | undefined>{
        return this.runIndex(Object.keys(this.fns).indexOf(label))
    }

    private runIndex(index: number): Promise<T | undefined> {
   
        if(index >= Object.keys(this.fns).length || index < 0){
            return Promise.resolve(undefined)
        }

        const label: string = Object.keys(this.fns)[index]

        let fn: GotoFn<T> = this.fns[label]

        return new Promise<T | undefined>((resolve,reject) => {
            fn(name => reject(name),val => resolve(val))

            resolve(undefined)

        })
        .then(
            val => index >= Object.keys(this.fns).length || index < 0 || val !== undefined ? val : this.runIndex(index+1),
            name => this.runLabel(name)
        )
    }
}

export const withGoto = <T>(body: Record<string,GotoFn<T>>) => new Goto<T>(body).run()