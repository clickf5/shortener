import React from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import AddLinkForm from '../AddLinkForm/AddLinkForm';
import LinkCard from '../LinkCard/LinkCard';
import Footer from '../Footer/Footer';

const App = () => {
  const links = useSelector((state: RootState) => state.links);

  const renderLinks = () => links.map((link) => <LinkCard key={link.id} linkUrl={link.url} linkId={link.id} />);

  return (
    <>
      <AddLinkForm/>
      {renderLinks()}
      <Footer/>
    </>
  );
}

export default App;
