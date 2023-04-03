import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  console.log(channelDetail);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height: '300px',
          background: 'radial-gradient(circle, rgba(252,21,3,1) 0%, rgba(0,0,0,1) 100%)',
          zIndex: 10
          }} />
          <ChannelCard channelDetail={channelDetail} marginTop="-115px" />
      </Box>
      <Box display="flex" p="2">
          <Box sx={{ mr: {sm: '150px'} }} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail