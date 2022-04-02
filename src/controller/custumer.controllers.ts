import {Request, Response} from 'express'
import { Repository } from '../repository';
import { CustumerService } from '../service/custumer.service';
import { Service } from '../service/service'

const repo = new Repository
const repository = new Service(repo)
const custRepository = new CustumerService(repo)

export class CustumerController {

     async getProductByID (req:Request<{id: string}>, res:Response) { 
        try {   
            const response:any = await repository.findById(parseInt(req.params.id))
            res.status(200).send(response)
        } catch {
            res.status(400).send('Algo de errado não está certo certo')
            throw new Error("Check your URL params")
        }
    }

    async buyProduct(req:Request<{id: string}>, res:Response){ 
        const id = Number(req.params.id)
        const {name, price, item_quanti} = await req.body
        try {
        const response = await custRepository.buying(name, price, item_quanti, id)
        return res.status(200).send(req.body)
        } catch(erro:any) {
            res.status(400).send('Algo de errado ao fazer o seu pedido')
        }        
    }
}