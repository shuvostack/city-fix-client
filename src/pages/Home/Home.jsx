import React from 'react';
import Banner from './Banner';
import LatestResolvedIssues from './LatestResolvedIssues';
import Features from './Features';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import MobileApp from './MobileApp';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolvedIssues></LatestResolvedIssues>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <MobileApp></MobileApp>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;