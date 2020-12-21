import React, { useEffect, useState } from 'react';
import { Table, Form,  Button, Carousel, Container, Row, Col, Card, label } from 'react-bootstrap';
import { db , storage} from '../../utils/firebaseConfig';
import FileUploader from "react-firebase-file-uploader";

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [nome, setNome] = useState(' ');
    const [descricao, setDescricao] = useState(' ');
    const [id, setId] = useState(0);
    const _dbEventos = db.collection('eventos');
    const [urlImagem, setUrlImagem] = useState([]);

    useEffect(() =>{ 
        listarEventos();
    }, [])

    const listarEventos = () => {
        try {
            db.collection('eventos')
            .get()
            .then( result => {
                console.log('Collection Eventos', result.docs);
                const data = result.docs.map(doc =>{
                    return{
                        id : doc.id,
                        nome : doc.data().nome,
                        descricao : doc.data().descricao,
                        urlImagem : doc.data().urlImagem
                    }
                })
                setEventos(data);
            }) 
            .catch (error => console.error(error));
        } catch (error) {
            console.error(error)
        }
    }

    const editar = (event) => {
        event.preventDefault();
        try {
            
            _dbEventos.doc(event.target.value)
                .get()
                .then(result => {
                    setId(result.id);
                    setNome(result.data().nome);
                    setDescricao(result.data().descricao);
                    setUrlImagem(result.data().urlImagem)
                })
        } catch (error) {
            console.error(error);
        }
    }
    const remover = (event) => {
        event.preventDefault();
        try {
            _dbEventos
                .doc(event.target.value)
                .delete()
                .then(() =>{
                    alert("Evento deletado");
                    listarEventos();
                    limparCampos();
                })
        } catch (error) {
            console.error(error);
        }
    }
    const salvar = (event) => {
        event.preventDefault();

        try {
            const evento = {
                nome : nome,
                descricao : descricao,
                urlImagem : urlImagem
            }
    
            if(id === 0){
                db.collection('eventos')
                .add(evento)
                .then(() =>{
                    alert("evento cadastrado");
                    listarEventos();
                    limparCampos();
                })
                
            }else{
                db.collection('eventos')
                    .doc(id)
                    .set(evento)
                    .then(() => {
                        alert('Eventos alterado');
                        listarEventos();
                        limparCampos();
                    })
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    const limparCampos = () => {
        setId(0);
        setNome('');
        setDescricao('');
        setUrlImagem('');
    }
    const handleUploadError = error =>{
        console.error(error);
    }
    const handleUploadSuccess = filename =>{
        console.log("Sucesso uplaod")

        storage.ref('imagens')
        .child(filename)
        .getDownloadURL()
        .then(url => setUrlImagem(url))
        .catch(error => console.error(error))
    }

    return(
        <div>
            <Container>
                <h1>Eventos</h1>
                <p>Gerencie seus eventos</p>
                

                <Card>
                        <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group>
                                {urlImagem && <img src={urlImagem} style={{width : '200px'}} />}
                                <label style={{backgroundColor: "steelblue", color: "white", padding: 10, borderRadius: 4, cursor: "pointer"}}>
                                    Selecione uma imagem
                                <FileUploader
                                    accept="image/*"
                                    name="urlImagem"
                                    randomizeFilename
                                    storageRef={storage.ref('imagens')}
                                    
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                />
                                </label>
                            </Form.Group>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>

                            
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                            </Form.Group>
                            

                            <Button type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><img src={item.urlImagem} style={{ width : "150px"}}/></td>
                                            <td>{item.nome}</td>
                                            <td>{item.descricao}</td>
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
            </Container>
        </div>
    )
}
export default EventosPage;