import React, {useEffect, useState} from 'react'
import HomeTop from '../components/HomeTop'
import NewProductTab from '../components/NewProductTab'
import HotDeal from '../components/HotDeal'
import NewProduct from '../components/NewProduct'
import TopSelling from '../components/TopSelling'
import TopSellingChip from '../components/TopSellingChip'
import { API_URL } from '../constants'
import axios from 'axios'
import NewsLetter from '../components/NewsLetter'
import Store from './Store'
import HomeProduct from '../components/HomeProduct'
import TopCategory from '../components/TopCategory'
import Headers from '../components/header/Headers'
import EssentialsCard from '../components/Essentials'
import NewStylesCard from '../components/NewStyles'
function Home() {
    return (
        <div>
            <HomeTop />
            <TopCategory />
            <TopSelling />
            <HotDeal />
            <EssentialsCard />
            <NewProduct/>
            <NewStylesCard/>
            <br></br>
            <br></br>
            <HomeProduct />

        </div>
    )
}

export default Home