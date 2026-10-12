import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Fade, useMediaQuery, Alert, CircularProgress } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const suggestions = ['Ver catálogo de productos', 'Crear pedido'];
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const money = price => price == null || price === '' || !Number.isFinite(Number(price)) ? 'Precio no disponible' : new Intl.NumberFormat('es-CR', { style:'currency', currency:'CRC', maximumFractionDigits:0 }).format(Number(price));
function classify(text) {
  const q = normalize(text);
  if (!q) return { mode:'home', query:'' };
  if (/pedido|agregar al/.test(q) && !/catalogo|productos/.test(q)) return { mode:'future', query:'' };
  if (/comparar|compara|comparacion/.test(q)) return { mode:'compare', query:q };
  if (/^(busca|buscar|encuentra)/.test(q)) return { mode:'detail', query:q.replace(/^(busca|buscar|encuentra)(me)?\s+(el |la |un |una )?/, '') };
  if (/lista|listado/.test(q)) return { mode:'list', query:'' };
  if (/catalogo|todos los productos/.test(q)) return { mode:'cards', query:'' };
  return { mode:'cards', query:q };
}
function filterProducts(products, query) {
  const stop = new Set(['muestrame','mostrar','muestra','ver','quiero','los','las','el','la','de','del','un','una','producto','productos','cirio','cirios']);
  const terms = normalize(query).split(/\W+/).filter(word => word && !stop.has(word));
  return terms.length ? products.filter(p => terms.every(word => normalize(p.name).includes(word))) : products;
}
function ProductCard({product}) {
  const [imageFailed,setImageFailed]=useState(false);
  return <Box sx={{bgcolor:'#303030',border:'1px solid #444',borderRadius:3,overflow:'hidden'}}>
    <Box sx={{height:132,bgcolor:'#393939',display:'grid',placeItems:'center',color:'#aaa',fontSize:12,overflow:'hidden'}}>
      {product.imageurl && !imageFailed
        ? <Box component="img" src={product.imageurl} alt={product.name} loading="lazy" onError={()=>setImageFailed(true)} sx={{width:'100%',height:'100%',objectFit:'contain'}}/>
        : 'Sin imagen'}
    </Box>
    <Box sx={{p:2}}><Typography sx={{fontWeight:600}}>{product.name}</Typography><Typography sx={{mt:1,color:'#ddd'}}>{money(product.price)}</Typography></Box>
  </Box>;
}
export default function App() {
  const [intent,setIntent]=useState('');
  const [result,setResult]=useState(null);
  const [busy,setBusy]=useState(false);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
  async function run(value) {
    setIntent(value);
    const {mode,query}=classify(value);
    if(mode==='home'){setResult(null);return;}
    if(mode==='future'){setResult({mode});return;}
    setBusy(true);setResult(null);
    try {
      const url=import.meta.env.VITE_CATALOG_API_URL || 'https://us-central1-cirios-app.cloudfunctions.net/publicCatalogApi';
      const response=await fetch(url);
      if(!response.ok) throw new Error(response.status===401 || response.status===403 ? 'El catálogo requiere autorización.' : 'No se pudo consultar el catálogo.');
      const json=await response.json();
      if(!Array.isArray(json.products)) throw new Error('Formato de catálogo inesperado.');
      const products=json.products.filter(p=>p && typeof p.name==='string').map((p,i)=>({id:p.id || i,name:p.name,price:p.price,imageurl:typeof p.imageurl==='string' && /^https:\/\//i.test(p.imageurl) ? p.imageurl : null}));
      setResult({mode,products:filterProducts(products,query)});
    } catch(e) {setResult({mode:'error',message:e.message || 'No se pudo consultar el catálogo.'});}
    finally {setBusy(false);}
  }
  const showing=Boolean(result);
  return <Box sx={{minHeight:'100dvh',bgcolor:'#111',display:'grid',placeItems:'center',p:{xs:0,sm:2}}}>
    <Box sx={{width:'100%',maxWidth:720,minHeight:{xs:'100dvh',sm:'min(84dvh,760px)'},bgcolor:'#242424',borderRadius:{xs:0,sm:'36px'},px:{xs:2.5,sm:4},py:{xs:3.5,sm:4},display:'flex',flexDirection:'column'}}>
      <Box component="header" sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><Typography sx={{fontSize:{xs:22,sm:28},fontWeight:650,letterSpacing:'-.04em',cursor:'pointer'}} onClick={()=>{setResult(null);setIntent('');}}>Mi Taller</Typography><IconButton disabled aria-label="Menú no disponible"><MenuRoundedIcon/></IconButton></Box>
      <Box component="main" sx={{flex:1,display:'flex',flexDirection:'column',justifyContent:showing?'flex-start':'center',gap:3,pb:'5vh',pt:showing?4:0}}>
        <Typography component="h1" sx={{fontSize:{xs:showing?27:32,sm:showing?34:44},fontWeight:650,textAlign:showing?'left':'center',letterSpacing:'-.045em',lineHeight:1.15}}>{showing?'Tu catálogo':'¿Qué quieres hacer?'}</Typography>
        {busy && <Box sx={{display:'flex',justifyContent:'center'}}><CircularProgress size={28}/></Box>}
        {result && <Box aria-live="polite">
          {result.mode==='error'?<Alert severity="warning">{result.message}</Alert>:result.mode==='future'?<Typography color="text.secondary">Crear pedidos estará disponible próximamente.</Typography>:<>
            <Typography sx={{color:'#bbb',mb:2}}>{result.products.length ? `Encontré ${result.products.length} producto(s).` : 'No encontré productos para esta búsqueda.'}</Typography>
            {result.mode==='list' ? <Box sx={{display:'grid',gap:1}}>{result.products.map(p=><Box key={p.id} sx={{display:'flex',justifyContent:'space-between',gap:2,p:1.5,borderBottom:'1px solid #444'}}><Typography>{p.name}</Typography><Typography sx={{whiteSpace:'nowrap',color:'#ccc'}}>{money(p.price)}</Typography></Box>)}</Box>
            : result.mode==='compare' ? <Box sx={{overflowX:'auto'}}><Box component="table" sx={{width:'100%',borderCollapse:'collapse','& td,& th':{p:1,textAlign:'left',borderBottom:'1px solid #444'}}}><thead><tr><th>Producto</th><th>Precio</th></tr></thead><tbody>{result.products.map(p=><tr key={p.id}><td>{p.name}</td><td>{money(p.price)}</td></tr>)}</tbody></Box></Box>
            : <Box sx={{display:'grid',gridTemplateColumns:result.mode==='detail'?'1fr':{xs:'repeat(2,minmax(0,1fr))',sm:'repeat(3,minmax(0,1fr))'},gap:1.5}}>{result.products.map(p=><ProductCard key={p.id} product={p}/>)}</Box>}
          </>}
        </Box>}
        <Box component="form" onSubmit={e=>{e.preventDefault();void run(intent);}}><TextField fullWidth value={intent} onChange={e=>setIntent(e.target.value)} placeholder="Escribe o describe tu tarea..." inputProps={{'aria-label':'Describe tu tarea'}} InputProps={{startAdornment:<InputAdornment position="start"><SearchRoundedIcon sx={{color:'#999'}}/></InputAdornment>,endAdornment:<InputAdornment position="end"><IconButton disabled title="Voz pendiente de implementación" aria-label="Voz no disponible"><MicNoneRoundedIcon/></IconButton></InputAdornment>}} sx={{'& .MuiOutlinedInput-root':{borderRadius:'32px',minHeight:68,background:'transparent','& fieldset':{borderColor:'#444',borderWidth:2},'&:hover fieldset':{borderColor:'#666'},'&.Mui-focused fieldset':{borderColor:'#aaa'}},'& input':{fontSize:{xs:15,sm:19}},'& input::placeholder':{color:'#999',opacity:1}}}/></Box>
        {!showing && <Box role="group" aria-label="Intenciones sugeridas" sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:1.5}}>{suggestions.map((label,index)=><Fade in timeout={reducedMotion?0:480} style={{transitionDelay:reducedMotion?'0ms':(240+index*200)+'ms'}} key={label}><Button onClick={()=>{void run(label);}} variant="text" sx={{color:'#f5f5f5',bgcolor:'#303030',borderRadius:99,textTransform:'none',px:2.5,py:1.5,fontSize:{xs:14,sm:17},'&:hover':{bgcolor:'#3b3b3b'}}}>{label}</Button></Fade>)}</Box>}
      </Box>
    </Box>
  </Box>;
}
