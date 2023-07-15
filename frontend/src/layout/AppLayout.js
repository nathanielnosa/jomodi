import React, { useState } from "react";
import {
    AppShell, Navbar, Header, Text,
    Footer,
    Aside,
    MediaQuery,
    Burger,
    useMantineTheme,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";


function MainLayout(props) {
    const theme = useMantineTheme();
    return (

        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            header={
                <Header />
            }
            footer={
                <Footer />
            }
        >
            <Outlet />
        </AppShell>

    );
}

export default MainLayout;
