import express, {Request, Response} from 'express';
import path from 'path';
import mustache from 'mustache-express';

import mainRoutes from './routes';
import basicRoutes from './routes/basic';
import pageRoutes from './routes/pages';

const server = express();

// Configurando o mustache
server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

const publicPath = path.join(__dirname, '../public');
server.use(express.static(publicPath));

server.use(mainRoutes);
server.use('/basico', basicRoutes);
server.use('/pages', pageRoutes);

server.use((req: Request, res: Response) => {
    res.status(404).send('Página não encontrada!');
});

server.listen(3000);

/*
    Observação sobre o import:
        se o arquivo importado tem o nome de index, pode-se colocar apenas o nome da pasta:
        ex: import mainRoutes from  './routes';

    Observação sobre as rotas:
        podemos adicionar um prefixo:
        ex: server.use('/prefixo', adminRoutes);

    Observação sobre server.listen:
        ele recebe como parâmetro a porta onde o servidor irá rodar,
        nesse caso, é na porta 3000
    
    Observação sobre a página de 404:
        quando o usuário faz a requisição para uma rota
        o node irá passar de rota em rota verificando se é a que o usuário deseja
        caso ele não encontre ele irá bater na de 404 que criamos:

        server.use((req: Request, res: Response) => {
            res.status(404).send('Página não encontrada!');
        });

        por isso, essa deve ser a última rota a ser criada

    Observação sobre server.use(express.static('public'));
        significa que estamos mandando o express pegar os arquivos da pasta public
        e transforma-los em rotas que dê acesso a eles

        podemos adicionar um prefixo nessas rotas:
        server.use('/public', express.static('public'));

        porém esse comando gera um problema:
        ele procura a pasta public a partir do ponto que o comando 
            start-dev / node etc / nodemon é executado

            ex: se iniciamos o servidor a partir da pasta 01_NocoesBasicas
                (usando o comando npm run start-dev) -> ele encontra a pasta public e funciona normal
            
            ex 2: se iniciamos o servidor a partir da pasta curso_node
                (usando o comando ts-node 01_NocoesBasicas/src/server.ts)
                -> ele não encontra a pasta public e não consegue usar os arquivos
        
        para resolver o problema:
            usar biblioteca que vem junto com o express:
            import path from 'path';

            const publicPath = path.join(__dirname, '../public');
            explicando o comando:
            path.join(__dirname); -> pega o caminho do diretório de onde o arquivo server.ts está 
                (pq foi nesse arquivo que o comando foi usado)
            
            o '../public' foi usado para sairmos da pasta src e entrarmos na public
*/
