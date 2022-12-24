import React from "react"
import ItemList from "./ItemList"
import '../ItemDetailContainer/ItemDetail.css';
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getFirestore } from "../../services/getFirebase";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([])
    const {idCategoria} = useParams()

    useEffect(() => {

        if(idCategoria){
            const db = getFirestore()
            db.collection('item').where('category', '==', idCategoria).get()
            .then(resp => {
                setProductos( resp.docs.map( producto => ({ id: producto.id, ...producto.data() })))
            })
            .catch(err => console.log(err))
        }
        else {
            const dataBase = getFirestore()
            dataBase.collection('item').get()
            .then(resp => {
                setProductos( resp.docs.map( producto => ({ id: producto.id, ...producto.data() })))
            })
            .catch(err => console.log(err))

        }

    },[idCategoria])
    
    return(
        <div className="containerList">
            <ItemList productos={productos}/>
        </div>
    )
}

export default ItemListContainer