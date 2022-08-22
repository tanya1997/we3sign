import React from 'react';
import { Grid, Card, TextField,  CardContent, Stack, List, Typography, IconButton} from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function DocInfo(props) {

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
  
    return (
      <Card  style={{margin: "60px auto", maxWidth: '720px', height: "auto", maxHeight: '600px'}}>
        
        <div className="main" >
          <IconButton component="button" style={{marginTop: "10px", color: "white"}} onClick={() => props.setSwitchMode(true)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5" className='inner'  style={{position: "relative", left: "-20px"}}  component="h3" noWrap color="#FFFFFF" align='center' fullWidth={true} >
            Found {props.cards.length} uploaded documents
          </Typography>
        </div>

        <Stack container spacing={1} style={{margin: "20px auto",width: '700px', height: "auto", maxHeight: '600px', overflowY: 'auto' }}>
          {props.cards.map((cards, index) => {
            //const { hash } = cards;
            return (
              <Grid item>
                <Card key={index}>
                  <CardContent>

                      <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="body1"  style={{width: '100px'}}>Document: </Typography>
                          <TextField id="outlined-basic" style={{width: '500px'}} value={cards}  InputProps={{readOnly: true}} variant="outlined" />
                          <CopyToClipboard text={cards}>
                            <IconButton color="primary" component="button">
                              <ContentCopyIcon />
                            </IconButton>
                          </CopyToClipboard>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="body1" style={{width: '100px'}} >Link to document: </Typography>
                          <TextField id="outlined-basic" value={'https://w3s.link/ipfs/' + cards}  style={{width: '500px'}} InputProps={{readOnly: true}} variant="outlined" />
                            <IconButton color="primary" component="button" onClick={() => openInNewTab('https://w3s.link/ipfs/' + cards)}>
                              <OpenInNewIcon />
                            </IconButton>
                      </Stack>
                      
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Stack>
      </Card>
    );
}

export default DocInfo;