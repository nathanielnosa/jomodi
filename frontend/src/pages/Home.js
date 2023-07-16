import React from 'react'
import HomeTop from '../components/HomeTop'
import NewProductTab from '../components/NewProductTab'
import HotDeal from '../components/HotDeal'
import NewProduct from '../components/NewProduct'
import TopSelling from '../components/TopSelling'
import TopSellingChip from '../components/TopSellingChip'

function Home() {
    return (
        <>
            <HomeTop />
            <NewProduct />
            <HotDeal />
            <NewProduct />
            <TopSellingChip />

        </>
    )
}

export default Home