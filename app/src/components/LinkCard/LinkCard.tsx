import React from 'react';
import ActionTimer from '../ActionTimer/ActionTimer';
import { removeLink } from '../../slices/linksSlice';
import { useDispatch } from 'react-redux';

const LinkCard = (props: any) => {
  const { linkUrl, linkId } = props;
  const dispatch = useDispatch();
  const handleAction = () => {
   dispatch(removeLink(linkId));
  }
  return (<div className="alert alert-success d-flex" role="alert">
    <a className="flex-grow-1" href={linkUrl}>{linkUrl}</a>
    <ActionTimer handler={handleAction}/>
  </div>)
};

export default LinkCard;
