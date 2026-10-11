import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Fade, useMediaQuery } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
const intents=['Ver catálogo de productos','Crear pedido'];
export default function App(){
 const [intent,setIntent]=useState('');
 const [message,setMessage]=useState('');
 const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
 const select=(value)=>{setIntent(value);setMessage('Intención seleccionada. El siguiente paso está pendiente de diseño.');};
 const submit=(event)=>{event.preventDefault();setMessage(intent.trim()?'Intención recibida. Flujo pendiente de diseño.':'');};
 return <Box sx={{minHeight:'100dvh',bgcolor:'#111',display:'grid',placeItems:'center',p:{xs:0,sm:2}}}>
 <Box sx={{width:'100%',maxWidth:720,minHeight:{xs:'100dvh',sm:'min(84dvh,760px)'},bgcolor:'#242424',borderRadius:{xs:0,sm:'36px'},px:{xs:2.5,sm:4},py:{xs:3.5,sm:4},display:'flex',flexDirection:'column'}}>
 <Box component="header" sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><Typography sx={{fontSize:{xs:22,sm:28},fontWeight:650,letterSpacing:'-.04em'}}>Mi Taller</Typography><IconButton disabled aria-label="Menú no disponible"><MenuRoundedIcon/></IconButton></Box>
 <Box component="main" sx={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:4,pb:'5vh'}}>
 <Typography component="h1" sx={{fontSize:{xs:32,sm:44},fontWeight:650,textAlign:'center',letterSpacing:'-.045em',lineHeight:1.15}}>¿Qué quieres hacer?</Typography>
 <Box component="form" onSubmit={submit}><TextField fullWidth value={intent} onChange={e=>{setIntent(e.target.value);setMessage('');}} placeholder="Escribe o describe tu tarea..." inputProps={{'aria-label':'Describe tu tarea'}} InputProps={{startAdornment:<InputAdornment position="start"><SearchRoundedIcon sx={{color:'#999'}}/></InputAdornment>,endAdornment:<InputAdornment position="end"><IconButton disabled title="Voz pendiente de implementación" aria-label="Voz no disponible"><MicNoneRoundedIcon/></IconButton></InputAdornment>}} sx={{'& .MuiOutlinedInput-root':{borderRadius:'32px',minHeight:68,background:'transparent','& fieldset':{borderColor:'#444',borderWidth:2},'&:hover fieldset':{borderColor:'#666'},'&.Mui-focused fieldset':{borderColor:'#aaa'}},'& input':{fontSize:{xs:15,sm:19}},'& input::placeholder':{color:'#999',opacity:1}}}/></Box>
 <Box role="group" aria-label="Intenciones sugeridas" sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:1.5}}>{intents.map((label,index)=><Fade in timeout={reducedMotion?0:480} style={{transitionDelay:reducedMotion?'0ms':(240+index*200)+'ms'}} key={label}><Button onClick={()=>select(label)} variant="text" sx={{color:'#f5f5f5',bgcolor:'#303030',borderRadius:99,textTransform:'none',px:2.5,py:1.5,fontSize:{xs:14,sm:17},'&:hover':{bgcolor:'#3b3b3b'}}}>{label}</Button></Fade>)}</Box>
 <Typography role="status" aria-live="polite" sx={{minHeight:24,color:'#aaa',fontSize:13,textAlign:'center'}}>{message}</Typography>
 </Box></Box></Box>;
}
