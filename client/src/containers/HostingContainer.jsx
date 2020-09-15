import React from 'react';
import { useSelector } from 'react-redux';
import HostingCard from '../components/molecule/eventCategories/HostingCard';

function HostingContainer(props) {
  const user = useSelector((state) => state.auth.user);
  const events = user && user.hosting_events;
  return <HostingCard events={events} />;
}

export default HostingContainer;
