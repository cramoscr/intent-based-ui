import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Fade, useMediaQuery, Alert, CircularProgress } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const suggestions = ['Ver catálogo de productos', 'Crear pedido', 'Mostrar pedidos pendientes'];
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const money = price => price == null || price === '' || !Number.isFinite(Number(price)) ? 'Precio no disponible' : new Intl.NumberFormat('es-CR', { style:'currency', currency:'CRC', maximumFractionDigits:0 }).format(Number(price));
function classify(text) {
  const q = normalize(text);
  if (!q) return { mode:'home', query:'' };
  if (/^(mostrar|muestra|ver|consultar|consulta|listar|lista|ultimos|buscar|pedidos de)/.test(q) && /pedidos?/.test(q) && !/crear|agregar/.test(q)) {
    const customer = /pedidos? de (.+)$/.exec(q)?.[1] || '';
    if (/ultimos|recientes/.test(q)) return { mode:'unsupportedRecent', query:'' };
    return { mode:'orders', query:customer };
  }
  if (/^(crear|agregar|nuevo) pedido/.test(q) || /agregar al/.test(q)) return { mode:'future', query:'' };
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
  const [conversation,setConversation]=useState(null);
  const [catalog,setCatalog]=useState([]);
  const [loginEmail,setLoginEmail]=useState('');
  const [loginPassword,setLoginPassword]=useState('');
  const [checkoutToken,setCheckoutToken]=useState(()=>{try{const saved=JSON.parse(sessionStorage.getItem('ibui-auth')||'null');return saved?.expiresAt>Date.now()+60000?saved.idToken:null;}catch{return null;}});
  const [checkoutError,setCheckoutError]=useState('');
  const [orderSelection,setOrderSelection]=useState(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
  async function run(value) {
    setIntent(value);
    if(busy)return;
    if(conversation){
      const text=value.trim();
      if(!text)return;
      const previous=conversation;
      const messages=[...previous.messages,{from:'user',text}];
      const reply=(next,message)=>setConversation({...next,messages:[...messages,{from:'assistant',text:message}]});
      if(normalize(text)==='cancelar pedido'){setConversation(null);setIntent('');return;}
      if(previous.step==='customer'){
        reply({...previous,step:'product',customer:text},'¿Qué producto deseas agregar?');
      } else if(previous.step==='product'){
        const found=catalog.filter(p=>normalize(p.name).includes(normalize(text)));
        if(found.length===1)reply({...previous,step:'quantity',pending:found[0]},'¿Cuántas unidades de '+found[0].name+'?');
        else reply(previous,found.length?'Encontré varios productos. Escribe un nombre más específico: '+found.slice(0,5).map(p=>p.name).join(', '):'No encontré ese producto en el catálogo. Prueba con otro nombre.');
      } else if(previous.step==='quantity'){
        const qty=Number(text);
        if(!Number.isInteger(qty)||qty<1||qty>9999)reply(previous,'Indica una cantidad entera entre 1 y 9999.');
        else reply({...previous,step:'another',pending:null,items:[...previous.items,{...previous.pending,quantity:qty}]},'Producto agregado al carrito. ¿Deseas agregar otro producto? (sí/no)');
      } else if(previous.step==='another'){
        if(['si','sí'].includes(normalize(text)))reply({...previous,step:'product'},'¿Qué producto deseas agregar?');
        else if(normalize(text)==='no')reply({...previous,step:'date'},'¿Cuál es la fecha estimada de entrega? Escribe AAAA-MM-DD o «sin fecha».');
        else reply(previous,'Responde sí o no.');
      } else if(previous.step==='date'){
        const date=normalize(text)==='sin fecha'?null:text;
        const valid=date===null||(/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date))&&new Date(date).toISOString().slice(0,10)===date);
        if(!valid)reply(previous,'Indica una fecha válida AAAA-MM-DD o «sin fecha».');
        else reply({...previous,step:'checkout',committedDate:date},'Carrito listo. Revisa el resumen y confirma el pedido.');
      } else {
        reply(previous,'Usa el botón Confirmar pedido o escribe «cancelar pedido».');
      }
      setIntent('');
      return;
    }
    const selection=normalize(value).match(/^(?:ver|mostrar|detalle(?:s)? de) (?:el )?(primero|segundo|tercero|[1-9][0-9]*)$/);
    if(selection && result?.mode==='orders'){
      const ordinals={primero:1,segundo:2,tercero:3};
      const index=(ordinals[selection[1]]||Number(selection[1]))-1;
      const selected=result.orders[index];
      if(selected){setOrderSelection(selected.id);setIntent('');return;}
      setResult(previous=>({...previous,notice:'Ese pedido no aparece en los resultados actuales.'}));
      setIntent('');return;
    }
    const {mode,query}=classify(value);
    if(mode==='home'){setResult(null);return;}
    if(mode==='unsupportedRecent'){setResult({mode:'error',message:'La consulta de pedidos recientes todavía no está disponible. Consulta pedidos pendientes o por cliente.'});setIntent('');return;}
    if(mode==='orders'){
      setBusy(true);setResult(null);setOrderSelection(null);
      try{
        if(!checkoutToken){setResult({mode:'orders-auth',query});return;}
        const url=new URL(import.meta.env.VITE_ORDER_QUERY_API_URL || 'https://us-central1-cirios-app.cloudfunctions.net/ibuiOrderQueryApi');
        if(query)url.searchParams.set('customer',query);
        const response=await fetch(url,{headers:{Authorization:'Bearer '+checkoutToken}});
        const data=await response.json();
        if(response.status===401){setCheckoutToken(null);sessionStorage.removeItem('ibui-auth');setResult({mode:'orders-auth',query});return;}
        if(!response.ok)throw new Error(response.status===403?'No tienes permiso para consultar pedidos.':data.error||'No se pudieron consultar los pedidos.');
        if(!Array.isArray(data.orders))throw new Error('Respuesta de pedidos inesperada.');
        setResult({mode:'orders',orders:data.orders,hasMore:Boolean(data.hasMore)});
      }catch(e){setResult({mode:'error',message:e.message});}
      finally{setBusy(false);setIntent('');}
      return;
    }
    if(mode==='future'){
      setBusy(true);
      try {
        const response=await fetch(import.meta.env.VITE_CATALOG_API_URL || 'https://us-central1-cirios-app.cloudfunctions.net/publicCatalogApi');
        if(!response.ok)throw new Error('No se pudo consultar el catálogo real.');
        const data=await response.json();
        if(!Array.isArray(data.products))throw new Error('Formato de catálogo inesperado.');
        setCatalog(data.products.filter(p=>p && p.id && typeof p.name==='string').map(p=>({id:p.id,name:p.name,price:p.price})));
        setConversation({step:'customer',customer:'',items:[],pending:null,committedDate:null,messages:[{from:'user',text:value},{from:'assistant',text:'¿Para quién es el pedido?'}]});
      }catch(e){setResult({mode:'error',message:e.message});}
      finally{setBusy(false);}
      setIntent('');
      return;
    }
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
  async function signInForOrders(){
    if(busy)return;
    setBusy(true);setCheckoutError('');
    try{
      if(!loginEmail.trim()||!loginPassword)throw new Error('Introduce tu correo y contraseña.');
      const auth=await fetch('`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:loginEmail.trim(),password:loginPassword,returnSecureToken:true})});
      const data=await auth.json();
      if(!auth.ok||!data.idToken)throw new Error('No se pudo iniciar sesión.');
      setCheckoutToken(data.idToken);setLoginPassword('');
      sessionStorage.setItem('ibui-auth',JSON.stringify({idToken:data.idToken,expiresAt:Date.now()+Number(data.expiresIn||3600)*1000}));
      const url=new URL(import.meta.env.VITE_ORDER_QUERY_API_URL || 'https://us-central1-cirios-app.cloudfunctions.net/ibuiOrderQueryApi');
      if(result?.query)url.searchParams.set('customer',result.query);
      const response=await fetch(url,{headers:{Authorization:'Bearer '+data.idToken}});
      const payload=await response.json();
      if(!response.ok)throw new Error(response.status===403?'No tienes permiso para consultar pedidos.':payload.error||'No se pudieron consultar pedidos.');
      if(!Array.isArray(payload.orders))throw new Error('Respuesta de pedidos inesperada.');
      setResult({mode:'orders',orders:payload.orders,hasMore:Boolean(payload.hasMore)});
    }catch(e){setCheckoutError(e.message||'No se pudo consultar pedidos.');}
    finally{setBusy(false);}
  }
  async function checkout(){
    if(!conversation||conversation.step!=='checkout'||!conversation.items.length||busy)return;
    setBusy(true);setCheckoutError('');
    try{
      let token=checkoutToken;
      if(!token){
        if(!loginEmail.trim()||!loginPassword)throw new Error('Introduce el correo y contraseña de tu cuenta de Cirios-App.');
        const auth=await fetch('`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:loginEmail.trim(),password:loginPassword,returnSecureToken:true})});
        const data=await auth.json();
        if(!auth.ok||!data.idToken)throw new Error('No se pudo iniciar sesión. Comprueba tus credenciales.');
        token=data.idToken;setCheckoutToken(token);sessionStorage.setItem('ibui-auth',JSON.stringify({idToken:token,expiresAt:Date.now()+Number(data.expiresIn||3600)*1000}));setLoginPassword('');
      }
      const response=await fetch('https://us-central1-cirios-app.cloudfunctions.net/ibuiCheckoutApi',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({customer:conversation.customer,committedDate:conversation.committedDate,items:conversation.items.map(x=>({productId:x.id,quantity:x.quantity}))})});
      const data=await response.json();
      if(!response.ok){if(response.status===401){setCheckoutToken(null);sessionStorage.removeItem('ibui-auth');}throw new Error(data.error||'No se pudo registrar el pedido.');}
      setConversation(previous=>({...previous,step:'complete',messages:[...previous.messages,{from:'assistant',text:'Pedido registrado correctamente. Número: '+data.orderId}]}));
    }catch(e){setCheckoutError(e.message||'Error al registrar pedido. El carrito se conserva.');}
    finally{setBusy(false);}
  }
  const showing=Boolean(result || conversation);
  return <Box sx={{minHeight:'100dvh',bgcolor:'#111',display:'grid',placeItems:'center',p:{xs:0,sm:2}}}>
    <Box sx={{width:'100%',maxWidth:720,minHeight:{xs:'100dvh',sm:'min(84dvh,760px)'},bgcolor:'#242424',borderRadius:{xs:0,sm:'36px'},px:{xs:2.5,sm:4},py:{xs:3.5,sm:4},display:'flex',flexDirection:'column'}}>
      <Box component="header" sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><Typography sx={{fontSize:{xs:22,sm:28},fontWeight:650,letterSpacing:'-.04em',cursor:'pointer'}} onClick={()=>{setResult(null);setConversation(null);setIntent('');}}>Mi Taller</Typography><IconButton disabled aria-label="Menú no disponible"><MenuRoundedIcon/></IconButton></Box>
      <Box component="main" sx={{flex:1,display:'flex',flexDirection:'column',justifyContent:showing?'flex-start':'center',gap:3,pb:'5vh',pt:showing?4:0}}>
        <Typography component="h1" sx={{fontSize:{xs:showing?27:32,sm:showing?34:44},fontWeight:650,textAlign:showing?'left':'center',letterSpacing:'-.045em',lineHeight:1.15}}>{conversation?'Crear pedido':result?.mode?.startsWith('orders')?'Tus pedidos':showing?'Tu catálogo':'¿Qué quieres hacer?'}</Typography>
        {conversation && <Box aria-live="polite" sx={{display:'grid',gap:1.5}}>{conversation.messages.map((message,index)=><Box key={index} sx={{justifySelf:message.from==='user'?'end':'start',bgcolor:message.from==='user'?'#3c3c3c':'#303030',px:2,py:1.5,borderRadius:3,maxWidth:'90%'}}><Typography>{message.text}</Typography></Box>)}<Box sx={{bgcolor:'#303030',p:2,borderRadius:2,display:'grid',gap:1}}><Typography fontWeight={600}>Carrito temporal · {conversation.items.length} producto(s)</Typography>{conversation.items.map((item,index)=><Typography key={index} sx={{fontSize:14}}>{item.quantity} × {item.name} — {money(Number(item.price||0)*item.quantity)}</Typography>)}{conversation.items.length>0&&<Typography fontWeight={600}>Total estimado: {money(conversation.items.reduce((sum,item)=>sum+Number(item.price||0)*item.quantity,0))}</Typography>}<Typography color="text.secondary" sx={{fontSize:12}}>{conversation.step==='complete'?'Pedido registrado':'Carrito temporal · se pierde al recargar'}</Typography>{conversation.step==='checkout'&&<Box sx={{display:'grid',gap:1.5,mt:1}}>{!checkoutToken&&<><TextField label="Correo de Cirios-App" type="email" size="small" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/><TextField label="Contraseña" type="password" size="small" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/></>}{checkoutError&&<Alert severity="error">{checkoutError}</Alert>}<Button variant="contained" disabled={busy} onClick={()=>void checkout()}>Confirmar pedido</Button><Typography color="text.secondary" sx={{fontSize:12}}>Tu sesión se conserva durante esta pestaña. El pedido se guarda únicamente al confirmar.</Typography></Box>}</Box></Box>}
        {busy && <Box sx={{display:'flex',justifyContent:'center'}}><CircularProgress size={28}/></Box>}
        {result && <Box aria-live="polite">
          {result.mode==='error'?<Alert severity="warning">{result.message}</Alert>:result.mode==='orders-auth'?<Box sx={{display:'grid',gap:1.5}}>
            <Typography>Inicia sesión como operador del taller para consultar pedidos.</Typography>
            <TextField label="Correo de Cirios-App" type="email" size="small" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
            <TextField label="Contraseña" type="password" size="small" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
            {checkoutError&&<Alert severity="error">{checkoutError}</Alert>}
            <Button variant="contained" disabled={busy} onClick={()=>void signInForOrders()}>Consultar pedidos</Button>
          </Box>:result.mode==='orders'?<Box sx={{display:'grid',gap:1.5}}>
            <Typography color="text.secondary">{result.orders.length? `Encontré ${result.orders.length} pedido(s).`:'No encontré pedidos pendientes para esta consulta.'}</Typography>
            {result.notice&&<Alert severity="info">{result.notice}</Alert>}
            {result.orders.map((order,index)=><Box key={order.id} component="button" type="button" onClick={()=>setOrderSelection(orderSelection===order.id?null:order.id)} sx={{bgcolor:'#303030',color:'inherit',border:'1px solid #444',borderRadius:2,p:2,textAlign:'left',cursor:'pointer'}}>
              <Typography fontWeight={600}>{index+1}. {order.clientName}</Typography>
              <Typography sx={{fontSize:13,color:'#bbb'}}>Pedido {order.id} · {order.committedDate||'Sin fecha comprometida'}</Typography>
              <Typography sx={{fontSize:14}}>{(order.productNames||[]).join(', ')||'Sin detalle de productos'}</Typography>
              {orderSelection===order.id&&<Typography sx={{mt:1,fontWeight:600}}>Total: {money(order.total)} · Estado: Registrado</Typography>}
            </Box>)}
            {result.hasMore&&<Typography color="text.secondary" sx={{fontSize:13}}>Hay más pedidos. Refina la consulta por cliente.</Typography>}
          </Box>:result.mode==='future'?<Typography color="text.secondary">Crear pedidos estará disponible próximamente.</Typography>:<>
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
