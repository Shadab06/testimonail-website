import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from "../assets/1.jfif";
import AddTestimonials from "./ManageTestimonials";
import axios from "axios";
// import "./MainPage.css"

const Testimonials = () => {
    const [show, setShow] = useState(false)
    const [getTestimonials, setGetTestimonils] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [updateData, setUpdateData] = useState({})

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/get")
                setGetTestimonils(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDatas();
    }, [getTestimonials])

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const addCard = () => {
        setShow(!show)
    }

    const editCard = (data) => {
        console.log(data)
        setUpdateId(data._id)
        setUpdateData(data)
        setShow(!show);
    }

    const deleteCard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-testimonial">
            <h1>Testimonial</h1>
            <p>Stop wasting time and money designing and managing a website<br></br> that doesn’t get results. Happiness guaranteed!</p>
            <Button
                onClick={addCard}
                style={{
                    position: "absolute",
                    top: "50px",
                    right: "50px",
                    borderRadius: "50px",
                    background: "blue",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Add
            </Button>
            {show && <AddTestimonials />}
            <Slider {...settings}>
                {getTestimonials?.map(data => (
                    <div>
                        <Card style={{ margin: "10px" }}>
                            <CardMedia
                                style={{ position: "relative", width: "100px", height: "100px", margin: "auto", borderRadius: "50%" }}
                                component="img"
                                height="140"
                                image={data?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {data?.description}
                                </Typography>
                                <hr></hr>
                                <Typography gutterBottom variant="h5" component="div">
                                    {data?.name} <br></br>
                                    {data?.post}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => editCard(data)}>Edit</Button>
                                <Button onClick={() => deleteCard(data._id)} style={{ position: "absolute", right: "10px" }}>Delete</Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </Slider>
            {updateId && <AddTestimonials fetchedData={updateData} updateId={updateId} />}
        </div>
    )
}

export default Testimonials;