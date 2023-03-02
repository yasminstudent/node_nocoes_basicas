import { Router, Request, Response } from "express"

const router = Router()

router.get('/exibindo', (req: Request, res: Response) => {
    let user = {
        name: 'Yasmin',
        age: 21
    }

    //exibindo a view
    res.render('base/exibindo', {
        user, //isso se equivale a user: user
        teste: 123,
    })

    /*
        se quisermos colocar outro nome podemos passar assim:
        res.render('base/exibindo', {
            'outronome': user
        })
    */
});

router.get('/condicional', (req: Request, res: Response) => {
    let age = 21
    let minor: boolean = true
    let adults: boolean = false

    //Não é possível fazer verificações desse tipo na view
    //lá só conseguimos verificar se a variavel é true
    if (age >= 18) {
        minor = false
        adults = true
    }

    res.render('base/condicional', {
        showMessageMinor: minor,
        showMessageAdults: adults
    })
});

router.get('/lista', (req: Request, res: Response) => {
    let products: Array<object> = [
        {name: 'Produto X', price: 10},
        {name: 'Produto Y', price: 15},
        {name: 'Produto Z', price: 20},
    ]

    let simpleArray : Array<string> = [
        'Essa gente inventa cada coisa',
        'Ah eu não digo',
        'To procurando rachadores',
    ];

    res.render('base/lista', {
        products,
        //phrases: simpleArray,
        phrases: [],
    })
});

export default router