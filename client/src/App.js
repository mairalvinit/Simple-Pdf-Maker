import React,{useState} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import AppBar from './random';
import { TextField,Grid,Button,Paper } from '@material-ui/core';

const App = () => {

    const [contents , setContents] = useState({
        name : '',
        receiptId : 0,
        price1 : 0,
        price2 : 0,
    })

    const handleChange = (e) => { 
        const {value,name} = e.target;
        setContents({...contents, [name] : value}); 
}

    const createAndDownloadPdf = () => {
        console.log(contents)
        axios.post('/create-pdf',contents)
            .then(()=>axios.get('fetch-pdf' , {responseType: 'blob'}))
                .then((res)=> {
                    const pdfBlob = new Blob([res.data] , {type : 'application/pdf' })

                    saveAs(pdfBlob , `newPdf_${contents.receiptId}.pdf`);
                })
    }

    return (
        <Grid container spacing={3}>
        <Grid item xs={12}>
         <AppBar />
         </Grid>
         <Grid item xs={12} >
         <Paper style={{marginTop:'50px' , justifyContent: 'center',alignItems: 'center'}}>
        
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Name" variant="outlined" type="text" name="name" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Receipt Id" variant="outlined" type="text"  name="receiptId" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Price 1" variant="outlined" type="text"  name="price1" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Price 2" variant="outlined" type="text"  name="price2" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={createAndDownloadPdf}>Create PDF</Button>
        </Grid> 
         
         
         
         
         
        
         </Paper>
         </Grid>
        </Grid>
    )
}

export default App