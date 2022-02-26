import {Request, Response} from 'express'
import {pool} from '../config/database';
import { Repository } from '../repository';
import { Service } from '../service/service'
import { result } from './general.controllers';

const repo = new Repository
const repository = new Service(repo)

export const insertOne = async (req:Request, res:Response) => {
        const { name, price, quanti } = req.body
        const response = await repository.create(name, price, quanti)
        console.log(response)
        res.send(response)   
    }

export const getAll = async (req:Request<{id: string}>, res:Response) => { 
       const response = await repository.findAll()
       console.log(response)
       res.send(response) 
}
    


export const getProductByID = async (req:Request<{id: string}>, res:Response) => { 
    const id = parseInt(req.params.id)
    const response = await repository.findById(id)
    res.send(response)
}


export const putProduct = async (req:Request<{id: string}>, res:Response) => { 
    const id = Number(req.params.id)
    const {name, price, quanti} = req.body
    const response = await pool.query('UPDATE products SET name = $1, price = $2,quanti = $3 WHERE id = $4', [name, price, quanti, id])
        return res.status(200).send(req.body)        
}

export const deleteProduct = async (req:Request<{id: string}>, res:Response) => {
    const id = Number(req.params.id)
    const {name, price, quanti} = req.body
    const response = await pool.query('DELETE FROM PRODUCTS WHERE id = $1', [id])
        return res.status(200).send('Produto deletado com Sucesso!')
}




//export default Controller