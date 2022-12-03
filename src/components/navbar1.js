import { CollectionsBookmark, FeaturedPlayList, Home, LibraryAdd, LibraryBooks, Message, People, PowerSettingsNew, Send } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "@mui/icons-material/Menu"

export default function Navbar1() {

    var navi = useNavigate()
    function page(x) {
        navi("/" + x)
    }

    function logout() {
        localStorage.removeItem("LibrarianID")
        navi("/")
    }

    const [opn, setopn] = useState(false);
    function opnmenu() {
        setopn(!opn)
    }
    return (
        <>
            
            <Grid container sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                <Grid item lg={2} className="sidebar" >
                    <Box>
                        <List>
                            <ListItem>
                                <ListItemButton onClick={() => page("allbooks")}>
                                    <LibraryBooks />All Books
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("issuerequest")}>
                                    <CollectionsBookmark />Issue Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("bookrequests")}>
                                    <FeaturedPlayList />Book Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("addbook")}>
                                    <LibraryAdd />Add Book
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("managestudents")}>
                                    <People />Manage Stds
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={logout}>
                                    <PowerSettingsNew />Logout
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    </Box>
                </Grid>
            </Grid>

            <AppBar className="apbar" >
                <Toolbar>
                <Avatar src="https://static.vecteezy.com/system/resources/previews/000/585/835/original/vector-book-reading-logo-and-symbols-template-icons.jpg"></Avatar>

                    <Typography variant="h5" sx={{margin:'auto'}}>
                        Central Library
                    </Typography>

                    <MenuBar onClick={opnmenu} sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }} />
                    <Drawer open={opn} anchor={"right"} onClose={opnmenu} >
                        <List>
                        <ListItem>
                                <ListItemButton onClick={() => page("allbooks")}>
                                    <LibraryBooks />All Books
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("issuerequest")}>
                                    <CollectionsBookmark />Issue Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("bookrequests")}>
                                    <FeaturedPlayList />Book Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("addbook")}>
                                    <LibraryAdd />Add Book
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("managestudents")}>
                                    <People />Manage Stds
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={logout}>
                                    <PowerSettingsNew />Logout
                                </ListItemButton>
                            </ListItem>
                            <Divider />

                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

