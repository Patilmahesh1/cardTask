import React, { useEffect, useState } from 'react'
import { Button, Modal, Card, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "../style.css"



function MenuComponent() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState()


    const navigate = useNavigate()

    const [product, setProduct] = useState({
        productname: "",
        price: "",
        id: uuidv4()
    })

    useEffect(() => {
        product.img = image
    }, [image])

    const [data, setData] = useState([])



    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setData([...data, product])
        handleClose()
        setProduct({
            productname: "",
            price: ""
        })
    }

    console.log(data);

    const handleClick = (product, check) => {
        const cards = JSON.parse(localStorage.getItem("card")) || []
        const singleCard = cards?.find((item) => item.id === product.id)

        if (singleCard) {
            const updateCard = cards.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item, quantity: item.quantity + 1
                    }
                }
                return item
            })
            localStorage.setItem("card", JSON.stringify(updateCard))
        } else {
            localStorage.setItem("card", JSON.stringify([...cards, { ...product, quantity: 1 }]))
        }
        if (check) {
            navigate("/cart")
        }
    }

    const imageChange = (e) => {
        const imgsize = e.target.files[0].size
        if (imgsize < 200000) {
            if (e.target.files && e.target.files.length > 0)
                setImage(URL.createObjectURL(e.target.files[0]))
        } else {
            alert("Image should be less than 100kb")
        }
    }

    return (
        <>
            <Container>
                <div style={{ backgroundColor: "black" }} class="text-center mt-4">
                    <Button variant="info" className="my-2" onClick={handleShow}>
                        Add Now
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <form onSubmit={handleSubmit}>
                        <label>Upload Image</label>
                        <input type="file" class="form-control" onChange={imageChange} accept="image/png , image/jpeg, image/webp" required />
                        {/* <p className='text-danger' >Size should below 100kb</p> */}
                        <label>Product Name</label>
                        <input type="text" name="productname" value={product.productname} class="form-control" onChange={handleChange} required />
                        <label>Price</label>
                        <input type="number" name="price" value={product.price} class="form-control" onChange={handleChange} required />
                        <div class="text-center">
                            <Button variant="outline-secondary" type='button' className='my-3 mx-2' onClick={handleClose}>Close</Button>
                            <Button variant="outline-primary" type='submit' className='my-3'>Add Item</Button>
                        </div>
                    </form>
                </Modal>
                {data.map((item) => {
                    return <div key={item.id} class="my-4">
                        <div class="row">
                            <Card shadow  style={{ width: '18rem', height: "18rem"}} >
                                <Card.Img variant="top" src={item.img} style={{ height: "140px", width: "140px", margin: "0 auto" }} />
                                <Card.Body>
                                    <Card.Title class="text-center"><strong>{item.productname}</strong></Card.Title>
                                    <Card.Text class="text-center">
                                        ₹ {item.price}
                                    </Card.Text>
                                    <Button variant="secondary" onClick={() => handleClick(item, true)} type='button' style={{ width: "100%" }} >Add</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                })}
            </Container>
        </>
    )
}

export default MenuComponent