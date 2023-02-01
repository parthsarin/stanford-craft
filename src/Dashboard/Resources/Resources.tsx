import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Resources = () => {
  const { isLoading, data: user } = useAuthUser(['user'], getAuth());  
  
  useEffect(() => {
    if (isLoading || !user) return;

    // (async () => {
    //   const db = getFirestore();
    //   const userRef = doc(db, 'users', user.uid);
    //   const userDoc = await getDoc(userRef);
    // })();
  }, [isLoading, user]); 

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl">Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card sx={{ maxWidth: 345}}>
          <CardMedia
            sx={{ height: 140 }}
            image = {require('../../img/resources/squid-model.png')}
            title="squid model"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Squid Model
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of the Squid Model
            </Typography>
          </CardContent>
          <CardActions style={{display:'flex', flexFlow:'row wrap'}}>
            <Button size="small" href = "https://www.npr.org/transcripts/660168325">Podcast</Button>
            <Button size="small" href = "https://docs.google.com/presentation/d/1nXczmIFcxCLnscFAj_XQyjbDm2Ze9qZ66kwsDRXNLmQ/edit#slide=id.p">Worksheet</Button>
            <Button size="small" href = "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.uek0uo6wl3z5">Curriculum</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345}}>
          <CardMedia
            sx={{ height: 140 }}
            image = {require('../../img/resources/doxxing.png')}
            title="doxxing tiktok screengrab"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Consensual Doxxing
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the question "What data is available about me online?" with consensual doxxing. 
              Watch TikTok creator @notkahnjunior explain how she found how old 
              someone was by Googling about them and since then, people have been 
              asking her to find their birthdays. In this activity, students will 
              explore how she does that.
            </Typography>
          </CardContent>
          <CardActions style={{display:'flex', flexFlow:'row wrap'}}>
            <Button size="small" href = "https://www.tiktok.com/@notkahnjunior/video/7160059039433411882">Video</Button>
            <Button size="small" href = "https://docs.google.com/presentation/d/1-nTWaRxu5CcavXLECDQ9h9xsjzBoe4SvNnRhreQkkAU/edit">Worksheet</Button>
            <Button size="small" href = "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.waii72s3q7a4">Curriculum</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image = {require('../../img/resources/internet-health.png')}
            title="internet health"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              2022 Internet Health Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of the Internet Health Report
            </Typography>
          </CardContent>
          <CardActions style={{display:'flex', flexFlow:'row wrap'}}>
          <Button size="small" href = "https://2022.internethealthreport.org/facts/">Reading</Button>
            <Button size="small" href = "https://docs.google.com/presentation/d/1-nTWaRxu5CcavXLECDQ9h9xsjzBoe4SvNnRhreQkkAU/edit">Worksheet</Button>
            <Button size="small" href = "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.c8bu81asjfof">Curriculum</Button>
          </CardActions>
        </Card>
      </div>
     
    </div>
  )
}

export default Resources;
