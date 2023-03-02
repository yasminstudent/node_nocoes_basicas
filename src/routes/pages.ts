import { Router, Request, Response } from "express"

const router = Router()

router.get('/home', (req: Request, res: Response) => {
    let products: Array<object> = [
        {name: 'Morango', price: 10},
        {name: 'Banana', price: 15},
        {name: 'Uva', price: 20},
    ]
    res.render('pages/home', {
        products
    })
});

router.get('/sobre', (req: Request, res: Response) => {
    res.render('pages/sobre')
});

router.get('/contato', (req: Request, res: Response) => {
    res.render('pages/contato')
});

router.get('/nome', (req: Request, res: Response) => {
    //Pegando dados da URL:
    let nome: string = req.query.nome as string
    
    res.render('pages/nome', {
        nome
    })
});

router.get('/idade', (req: Request, res: Response) => {
    let idade: number = 0
    
    if (req.query.ano) {
        let anoNasc: number = parseInt(req.query.ano as string)
        let anoAtual: number = new Date().getFullYear()
        idade = anoAtual - anoNasc
    }

    res.render('pages/idade', {
        idade
    })
});

export default router