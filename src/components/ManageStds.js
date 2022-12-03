import { Delete, Edit } from "@mui/icons-material";
import { Autocomplete, Box, Button, ButtonGroup, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "./firebase";
import Navbar1 from "./navbar1";
import firebase from "firebase";

export default function ManageStd() {


    var navi = useNavigate()
    var lib = localStorage.getItem("LibrarianID")

    useEffect(() => {
        if (!lib) {
            alert("login first")
            navi("/")
        }
    }, [])

    const [opn, setopn] = useState(false)
    const [opn2, setopn2] = useState(false)

    const [id1, setid1] = useState('')
    const [ps, setps] = useState('')

    const [prog, setprog] = useState(0)


    const classes = [{ cls1: 'b.b.a' }, { cls1: 'b.com' }, { cls1: 'b.c.a' }, { cls1: 'b.tech' }, { cls1: 'b.a' }, { cls1: 'M.com' },]

    function addstd(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var img = d.get('img')
        console.log(img)

        var F_Name = d.get('f_name');
        var L_Name = d.get('l_name');
        var ClgId = d.get("clg_id");
        var Year = d.get("year");
        var Contact = d.get("contact");
        var Class = d.get('cls')

        console.log(F_Name)

        var alpha = /[A-Z a-z,'&.+]/
        var abc = []

        for (var i = 0; i < F_Name.length; i++) {
            if (!alpha.test(F_Name[i])) {
                abc.push(F_Name[i])
                // setfnm("")
            }
        }

        for (var i = 0; i < L_Name.length; i++) {
            if (!alpha.test(L_Name[i])) {
                abc.push(L_Name[i])
                // setlnm("")
            }
        }

        var num = /[0-9]/
        var abc2 = []
        for (var i = 0; i < Year.length; i++) {
            if (!num.test(Year[i])) {
                abc2.push(Year[i])
                // setyear("")
            }
        }

        for (var i = 0; i < Contact.length; i++) {
            if (!num.test(Contact[i])) {
                abc2.push(Contact[i])
                // setcot("")
            }
        }

        console.log(ClgId.length)
        var alphanum = /[ a-z0-9]/
        var abc3 = [];
        for (var i = 0; i < ClgId.length; i++) {
            if (!alphanum.test(ClgId[i])) {
                abc3.push(ClgId[i])
                // setclgId("")
            }
        }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        } else if (abc3 != "") {
            alert("enter correct id")
        } else {

            setprog(1)
            //setting studentid
            var result = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            var StdId = "std" + result;

            //setting password of student
            var pass = '';
            var characters2 = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength2 = characters2.length;
            for (var i = 0; i < 8; i++) {
                pass += characters2.charAt(Math.floor(Math.random() * charactersLength2));
            }
            var s_pass = pass

            var st_ref = storage.ref("/students/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    db.collection("Add_Std").add({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        Year: Number(Year),
                        ClgId: ClgId,
                        Image: url,
                        Contact: Number(Contact),
                        Class: Class.toLocaleLowerCase(),
                        StdId: StdId,
                        Password: s_pass,
                        Date: firebase.firestore.FieldValue.serverTimestamp()
                    }).then((succ) => {
                        setprog(0)
                        getstd()
                        e.target.reset()
                        e.target.value = ''
                        setopn(!opn)
                        alert("data added")
                    })
                })
            })
        }
    }

    const [std, setstd] = useState([])
    function getstd() {
        var ar = []
        db.collection('Add_Std').orderBy('Date', 'desc').get().then((succ) => {
            succ.forEach((abc) => {
                ar.push(abc)
            })
            setstd(ar)
        })
    }
    useEffect(() => {
        getstd()
    }, [])

    const [fnm, setfnm] = useState('')
    const [lnm, setlnm] = useState('')
    const [cot, setcot] = useState()
    const [year, setyear] = useState()
    const [clgId, setclgId] = useState()
    const [cls, setcls] = useState('')
    const [img, setimg] = useState('')
    const [s_id, sets_id] = useState('')
    const [pass, setpass] = useState('')

    const [id, setid] = useState('')

    function getdetails(x) {
        console.log(x.id)
        setid(x.id)
        db.collection('Add_Std').doc(x.id).get().then((succ) => {
            setfnm(succ.data().FirstName)
            setlnm(succ.data().LastName)
            setyear(succ.data().Year)
            setcls(succ.data().Class)
            setpass(succ.data().Password)
            sets_id(succ.data().StdId)
            setcot(succ.data().Contact)
            setclgId(succ.data().ClgId)
            setimg(succ.data().Image)
        })
        setopn2(!opn2)
    }

    //deleting data
    function del(x, y) {
        // console.log(x)
        if (window.confirm("ready to delete student?")) {
            db.collection("Add_Std").doc(x).delete();
            storage.refFromURL(y).delete().then((succ) => {
                alert("deleted")
                getstd();
                setopn2(!opn2)
            })
        }
    }

    const [opn3, setopn3] = useState(false)
    function edit(x) {
        console.log(x)
        setopn2(false)
        setopn3(!opn3)
    }

    function updatestd(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var img = d.get("img")
        console.log(img)

        var F_Name = fnm;
        var L_Name = lnm;
        var ClgId = clgId;
        var Year = year;
        var Contact = cot;
        var Class = cls

        var alpha = /[A-Z a-z,'&.+]/
        var abc = []

        for (var i = 0; i < F_Name.length; i++) {
            if (!alpha.test(F_Name[i])) {
                abc.push(F_Name[i])
                // setfnm("")
            }
        }

        for (var i = 0; i < L_Name.length; i++) {
            if (!alpha.test(L_Name[i])) {
                abc.push(L_Name[i])
                // setlnm("")
            }
        }

        var num = /[0-9]/
        var abc2 = []
        for (var i = 0; i < Year.length; i++) {
            if (!num.test(Year[i])) {
                abc2.push(Year[i])
                // setyear("")
            }
        }

        for (var i = 0; i < Contact.length; i++) {
            if (!num.test(Contact[i])) {
                abc2.push(Contact[i])
                // setcot("")
            }
        }

        console.log(ClgId.length)
        var alphanum = /[ a-z0-9]/
        var abc3 = [];
        for (var i = 0; i < ClgId.length; i++) {
            if (!alphanum.test(ClgId[i])) {
                abc3.push(ClgId[i])
                // setclgId("")
            }
        }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        } else if (abc3 != "") {
            alert("enter correct id")
        } else {
            var st_ref = storage.ref("/students/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    db.collection("Add_Std").doc(id).update({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        Year: Number(Year),
                        ClgId: ClgId,
                        Image: url,
                        Contact: Number(Contact),
                        Class: Class.toLocaleLowerCase()
                    }).then((succ) => {
                        setprog(0)
                        e.target.reset()
                        e.target.value = ''
                        alert("data updated")
                        setopn3(!opn3)
                        setopn2(true)
                    })
                })
            })
        }
    }

    return (
        <>
            <Navbar1 />
            <Grid container className="" >
                <Grid item lg={9} md={9} sm={11} xs={11} sx={{ mt: { md: 10, sm: 10, xs: 8 }, ml: { md: 25, sm: 5, xs: 2 }, display: { sm: 'flex', xs: "block" }, flexDirection: 'column' }}>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Button variant="outlined" onClick={() => setopn(!opn)} className="addstd" size="large">Add Student</Button>&nbsp;&nbsp;&nbsp;
                        {/* <TextField id="text-field" label="🔍Search" variant="outlined"  size="large" className="srch"  InputProps={{ sx: { height: 38} }}/> */}
                        <Box>
                            <Collapse in={opn}>
                                <form encType="multipart/form-data" className="form1" onSubmit={addstd} style={{ marginTop: '11px' }}>
                                    {/* <form encType="multipart/form-data" className="form1" onSubmit={id2 ? (editstd) : (addstd)} style={{ marginTop: '11px' }}> */}
                                    <TextField className="txtfld" name="f_name" placeholder="First Name" InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="l_name" placeholder="Last Name" InputProps={{ sx: { height: 38 } }} />
                                    {/* <TextField className="txtfld" onChange={(e) => setcls(e.target.value)} value={cls} name="l_name" placeholder="Class Name" InputProps={{ sx: { height: 38 } }} /> */}
                                    <FormControl fullWidth className="txtfld">
                                        {/* {!id2 && ( */}
                                        <InputLabel id="demo-simple-select-label" >Class</InputLabel>
                                        {/* )} */}
                                        <Select
                                            sx={{ height: 45 }}
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="cls"
                                        >
                                            {classes.map((val) => (
                                                <MenuItem value={val.cls1}>{val.cls1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                   {/* <FormControl></FormControl> */}
                                    <TextField className="txtfld" name="clg_id" placeholder="College Id" InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="year" placeholder="Year" InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="contact" placeholder="Contact" InputProps={{ sx: { height: 38 } }} />
                                    <input type="file" className="txtxfld2 " name="img" />
                                    {prog != 0 ? (
                                        <CircularProgress></CircularProgress>
                                    ) : (
                                        <Button variant="contained" type='submit' fullWidth>Add Student</Button>
                                    )}
                                </form>
                            </Collapse>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 3, xs: 2 }, ml: { md: 25, xs: 0 } }} >
                    <Typography variant="h3">Students</Typography>

                    <Grid container sx={{ gap: { md: '0.1', sm: 2 }, justifyContent: { md: 'start', xs: 'center' } }}>
                        {std.map((val) => (
                            <Grid item md={3} sm={5} xs={9} sx={{ marginBottom: { sm: 0, xs: 2 }, boxShadow: '0 0 3px dimgrey', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <b>Name : </b><br />
                                    <b>Student Id : </b><br />
                                    <b>Year : </b><br />
                                </Box>
                                <Box>
                                    {val.data().FirstName} {val.data().LastName}<br />
                                    {val.data().StdId}<br />
                                    {val.data().Year}<br /><br />
                                    <Button size="small" onClick={() => getdetails(val)}>view details</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={opn2} onClose={() => setopn2(!opn2)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <Box className="d-flex3" width={400}>
                        <Box>
                            <p><b>Name : </b>{fnm} {lnm}</p>
                            <p><b>Class : </b>{cls}</p>
                            <p><b>Year : </b>{year}</p>
                            <p><b>College Id : </b>{clgId}</p>
                            <p><b>Libraray Id : </b>{s_id} </p>
                            <p><b>Password : </b>{pass}</p>
                            <p><b>Contact : </b>{cot}</p>
                        </Box>
                        <Box>
                            <img src={img} height={150} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button onClick={() => del(id, img)}>del</Button>
                        <Button onClick={() => edit(id)}>edit</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>

            <Dialog open={opn3} onClose={() => setopn3(!opn3)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <form encType="multipart/form-data" className="form1" onSubmit={updatestd} style={{ marginTop: '11px' }}>
                        <TextField className="txtfld" onChange={(e) => setfnm(e.target.value)} value={fnm} name="f_name" placeholder="First Name" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setlnm(e.target.value)} value={lnm} name="l_name" placeholder="Last Name" InputProps={{ sx: { height: 38 } }} />
                        <FormControl fullWidth className="txtfld">
                            <Select
                                sx={{ height: 45 }}
                                onChange={(e) => setcls(e.target.value)} value={cls}
                                // onChange={(e) => setcls(e.target.value)}
                                name="cls"
                            >
                                {classes.map((val) => (
                                    <MenuItem onChange={(e) => setcls(e.target.value)} value={val.cls1}>{val.cls1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField className="txtfld" onChange={(e) => setclgId(e.target.value)} value={clgId} name="clg_id" placeholder="College Id" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setyear(e.target.value)} value={year} name="year" placeholder="Year" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setcot(e.target.value)} value={cot} name="contact" placeholder="Contact" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" value={s_id} InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" value={pass} InputProps={{ sx: { height: 38 } }} />
                        <input type="file" className="txtxfld2 " name="img" required />

                        <Button variant="contained" type='submit' fullWidth>Edit Student</Button>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}

