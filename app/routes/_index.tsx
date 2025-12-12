import React, { useEffect, useState } from 'react'

import WhereTo from './homepage/assets/search/SearchBusiness'
import HomeLayout from './landing/assets/HomeLayout'
import SearchBusiness from './homepage/assets/search/SearchBusiness'
import TopCategories from './homepage/assets/topcategories/TopCategories'
import LatestBusinesses from './homepage/assets/latestbusinesses/LatestBusinesses'
import Inspire from './homepage/assets/inspire/Inspire'
import Shopping from './homepage/assets/shopping/Shopping'
import Hotels from './homepage/assets/hotels/Hotels'
import YourGuide from './homepage/assets/yourguide/YourGuide'
import FooterAlt from '~/components/footer/FooterAlt'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { generateRandom10DigitNumber, getHomeListingByCategory, getLatestBusinesses, getListingByCategory, logError } from '~/lib/lib'
import { useLoaderData } from '@remix-run/react'
import { ListingType } from '~/lib/types'
import { late } from 'zod'
import TopDestinations from './homepage/assets/topdestinations/TopDestinations'
import NotificationDemo, { OperationNotification } from '~/components/content/OperationNotification'
import OperationDemo, { OperationProvider } from '~/context/OperationContext'



export const loader: LoaderFunction = async ({ request, params }) => {


  try {
    const id = params.id || null
    let hotels: ListingType[] | [] = []
    let latestBusinesses: ListingType[] | [] = []
    let gallery
    let ratingData
    let randomNumber


    try {
      hotels = await getHomeListingByCategory('hotel', 6)
      latestBusinesses = await getLatestBusinesses(10)
      randomNumber = generateRandom10DigitNumber()
      //console.log(latestBusinesses)

    } catch (error: any) {
      console.log(error.message)
    }



    return {
      hotels: hotels,
      latestBusinesses: latestBusinesses,
      randomNumber: randomNumber
    }
  } catch (err: any) {
    logError(err)
  }

}

type OperationType = 'login' | 'signup' | 'update' | 'processing';

export const meta: MetaFunction<typeof loader> = ({ data }) => {

  let randomNo = data?.randomNumber
  try {



    return [
      { title: "Bycet - Online Business Directory, Explore Listings Around The World" },
      { name: "description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
      { name: "keywords", content: "Business Directory Service, Location Services" },
      { property: "fb:app_id", content: "1325393508603168" },
      { property: "og:url", content: "https://bycet.com" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Bycet - Online Business Directory, Explore Listings Around The World" },
      { property: "og:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
      { property: "og:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
      { property: "og:image:secure_url", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Bycet" },
      { name: "twitter:site", content: "@bycetinc" },
      { name: "twitter:creator", content: "@bycetinc" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bycet - Online Business Directory, Explore Listings Around The World" },
      { name: "twitter:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
      { name: "twitter:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
      { name: "twitter:image:alt", content: "Bycet Business Directory Logo" }
    ];
  } catch (e: any) {
    logError(e)
  }

  return []
};

const _index = () => {
  const loader: any = useLoaderData()
  const hotels = loader.hotels
  const latestBusinesses = loader.latestBusinesses


  return (
    <OperationProvider defaultDuration={4000}>

      <HomeLayout>

        {/** background with search */}
        <SearchBusiness />


        {/** top categories */}
        {/* <TopCategories /> */}


        {/** top categories */}
        {/* <Hotels data={hotels} /> */}


        {/** top categories */}
        <YourGuide />


        {/** latest businesses */}
        {/* <LatestBusinesses data={latestBusinesses} /> */}
        {/* <TopDestinations /> */}


        {/** inspire */}
        {/*  <Inspire /> */}


        {/** shopping */}
        <Shopping />

        <div className={`h-[100px]`}>

        </div>

        {/** footer */}
        <FooterAlt />
      </HomeLayout>
    </OperationProvider>
  )
}

export default _index
