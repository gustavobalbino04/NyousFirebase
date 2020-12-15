import React, {useState} from "react";
import {useFirebaseApp} from 'reactfire';
import './index.css';
import {Form, Button, Container} from 'react-bootstrap';

const Login = () =>{
    const Firebase = useFirebaseApp();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) =>{
        event.preventDefault();

        Firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(result => {
            localStorage.SetToken("Nyous". result.user.refreshToken);
            alert("seja bem vindo");
        })
        .catch(error => {
            alert("Email ou senha invalidos ")
            console.error(error);
        })
    }
    return(
<div>
         
         <div>
            
             <Container className='form-height'>
                 <Form className='form-signin' onSubmit={event => logar(event)} >
                     <div className='text-center'>
                      <img  alt='NYOUS' style={{ width : '64px'}} />
                     </div>
                     <br/>
                     <small>Informe os dados Abaixo</small>
                     <hr/>
                     <Form.Group controlId="formBasicEmail">
                         <Form.Label>Email </Form.Label>
                         <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                     </Form.Group>
 
                     <Form.Group controlId="formBasicPassword">
                         <Form.Label>Senha</Form.Label>
                         <Form.Control type="password" placeholder="Senha"  value={senha} onChange={event => setSenha(event.target.value)}required/>
                     </Form.Group>
                     <Button variant="primary" type="submit" >
                         Enviar
                     </Button>
                     <br/><br/>
                     <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
                 </Form>
             </Container>
             
         </div>
     
            
                
         </div>
    )
}
export default Login;