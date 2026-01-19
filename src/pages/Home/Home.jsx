import React from 'react';
import Banner from './Banner';
import LatestResolvedIssues from './LatestResolvedIssues';
import Features from './Features';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import MobileApp from './MobileApp';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolvedIssues></LatestResolvedIssues>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <MobileApp></MobileApp>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;