import React from 'react'
import GroupTour from '../components/GroupTour';
import StaticContainer from '../components/StaticContainer';
import SearchableContainer from '../components/SearchableContainer';

function Home() {
  return (
    <>
        <SearchableContainer></SearchableContainer>
    <StaticContainer></StaticContainer>
    <GroupTour></GroupTour>
    </>
  )
}

export default Home