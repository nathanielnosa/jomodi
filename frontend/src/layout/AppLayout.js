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
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
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
                <AppHeader />
            }
            footer={
                <AppFooter />
            }
        >
            <section class="p-3 p-md-5">
            <Outlet />
            </section>
        </AppShell>

    );
}

export default MainLayout;
