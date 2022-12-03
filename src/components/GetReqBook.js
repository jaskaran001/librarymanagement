// GetReqBook
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { db } from "./firebase"
import Navbar1 from "./navbar1"

export default function GetReqBook() {

    const [data, setdata] = useState([])
    function getreq() {
        var ar = []
        db.collection("Req_Books").onSnapshot((succ) => {
            succ.forEach((abc) => {
                ar.push(abc)
                console.log(abc.data())
            })
            setdata(ar)
        })
    }
    useEffect(() => {
        getreq()
    }, [])
    return (
        <>
            <Navbar1 />
            <Grid container className="">
                <Grid item md={10} xs={12} sx={{ ml: { md: 25, xs: 7 }, mt: { md: 10, xs: 8 } }}  >
                    <Grid container>
                        {data.map((val) => (
                            <Grid item md={3} sm={6} xs={10} sx={{ mt: { md: 3, xs: 10 } }} >
                                <Box>
                                    <img textAlign={'center'} src={val.data().Image} height={100} />
                                    <p><b>Name : </b>{val.data().Title}</p>
                                    <p><b>Author : </b>{val.data().Author}</p>
                                    <p><b>Publisher : </b>{val.data().Publisher}</p>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
