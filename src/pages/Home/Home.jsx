import React from 'react';
import Banner from './Banner';
import LatestResolvedIssues from './LatestResolvedIssues';
import Features from './Features';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import MobileApp from './MobileApp';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import VolunteerCTA from './VolunteerCTA';
import Partners from './Partners';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolvedIssues></LatestResolvedIssues>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <MobileApp></MobileApp>
            <VolunteerCTA></VolunteerCTA>
            <Partners></Partners>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;