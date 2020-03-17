import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Table, Button, Page,  Modal, ModalHeader, ModalBody, ModalFooter, 
    ToastBody, Toast, ToastHeader, Input, InputGroup, InputGroupAddon,InputGroupText,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Jumbotron,Alert, UncontrolledAlert
    ,Label,   
    ButtonGroup
  } from 'reactstrap';


class App extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
          resultTable : [],
          modalIsOpen : false,
          Toast : false,
         
      };
  }

  function () {
    ('.example-popover').popover({
      container: 'body'
    })
  }


  componentDidMount(){
    this.getUsers();
  }

  toggleModal = () => {
      const modalIsOpen = this.state.modalIsOpen;
      this.setState({
          modalIsOpen: !modalIsOpen
      })
  }

  Toast(){
      const Toast = this.state.Toast;
      this.setState({
          Toast: !Toast
      })
  }


  getUsers(){
    const option = {
        method  : "GET",
        json    : true,
        headers : 
                {
                "Content-Type": "application/json;charset=UTF-8"
                },
        }

        fetch("http://10.0.112.9:8888/getUsers?Get=sqlAll",option)
        .then(response => response.json())
        .then(result =>{ 

                if(result.data === null)  {
                    console.log("data tidak ditemukan")
                }
                else{
                    console.log("data ditemukan") 
                    this.setState({ 
                        resultTable :  result.data,
                    })
                    console.log(this.state.resultTable)
                }
            });
  }

  insertUser(){
    var url     = "http://10.0.112.9:8888/insertUser?Insert=sql";
    var payload = {
        nip: this.state.inputtedNIP,
        nama_lengkap : this.state.inputtedNama,
        tanggal_lahir : this.state.inputtedTanggalLahir,
        jabatan : this.state.inputtedJabatan,
        email : this.state.inputtedEmail
    }

    fetch(url, {
        method : "POST",
        body   : JSON.stringify(payload),
        json   : true,
        headers:{
                 "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then(response => response.json())
        .then(result => {
          if(result.error.status === false)  {
            console.log("data berhasil diinput")
              this.setState({
                modalKonfirmasi : true
              
              })
              this.getUsers()
          }
          else{
              console.log("data gagal diinput") 
          }
        });
      }

  
  updateInputValue=(evt, type)=>{
    if(type === "inputNIP"){
      this.setState({
        inputtedNIP : evt.target.value
      })
    }
    if(type === "inputNama"){
      this.setState({
        inputtedNama : evt.target.value
      })
    }
    if(type === "inputTanggalLahir"){
      this.setState({
        inputtedTanggalLahir : evt.target.value
      })
    }
    if(type === "inputJabatan"){
      this.setState({
          inputtedJabatan : evt.target.value
      })
    }
    if(type === "inputEmail"){
      this.setState({
        inputtedEmail : evt.target.value
      })
    }
  }

  updateEditValue=(evt, type)=>{
    this.setState({
      ['edit'+type] : evt.target.value
    })
  }


  editUser(){
    var url     = "http://10.0.112.9:8888/updateUser?Update=sql&NIP="+this.state.editNIP;
    var payload = {
        user_id : 1,
        nip: this.state.editNIP,
        nama_lengkap : this.state.editNama,
        tgl_lahir : this.state.editTanggalLahir,
        jabatan : this.state.editJabatan,
        email : this.state.editEmail
    }

    console.log(payload)

    fetch(url, {
        method : "PUT",
        body   : JSON.stringify(payload),
        json   : true,
        headers:{
                 "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then(response => response.json())
        .then(result => {
          if(result.error.status === false)  {
            console.log("data berhasil diedit")
              this.setState({
                // modalEdit : true
                modal_edit : false
              })
              this.getUsers()
          }
          else{  
              console.log("data gagal diedit") 
          }
        });
      }

      editInputValue=(evt, type)=>{
        if(type === "editNIP"){
          this.setState({
            editNIP : evt.target.value
          })
        }
        if(type === "editNama"){
          this.setState({
            editNama : evt.target.value
          })
        }
        if(type === "editTanggalLahir"){
          this.setState({
            editTanggalLahir : evt.target.value
          })
        }
        if(type === "editJabatan"){
          this.setState({
              editJabatan : evt.target.value
          })
        }
        if(type === "editEmail"){
          this.setState({
            editEmail : evt.target.value
          })
        }
      }

  
  deleteUser(){
        var url     = "http://10.0.112.9:8888/deleteUser?Delete=sql&NIP=" + this.state.deleteNIP;
        
        fetch(url, {
            method : "DELETE",
            headers:{
                     "Content-type": "application/json; charset=UTF-8"
                    }
            })
            .then(response => response.json())
            .then(result => {
              if(result.error.status === false)  {
                console.log("data berhasil dihapus")
                  this.setState({
                    modal_delete : true
                  
                  })
                  this.getUsers()
              }
              else{
                  console.log("data gagal dihapus") 
              }
            });
          }

          updateDeleteValue=(evt, type)=>{
            this.setState({
              ['delete'+type] : evt.target.value
            })
          }
        
    

  render(){


    return (
        <div>
        <Jumbotron>
          <h1 className="display-3">HALO-HALO BANDOENG</h1>
          <p className="lead">Sehat-sehatlah kita selalu.</p>
          <hr className="my-2" />
          <p>Ini cuma hasil test aja</p>
          <p className="lead"></p>
            <Button color="primary">Pelajari lebih lanjut
            
            </Button> 
        </Jumbotron>

          {/* <div class ="embed-responsive embed-responsive-21by9">
          <iframe width="500" height="200" src="https://www.youtube.com/embed/bMb_cBv3iks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
          </div> */}
       

       <div class="d-inline-flex p-2 bd-highlight">
       <UncontrolledAlert color="primary">
       Berikut data yang tersedia.
        </UncontrolledAlert>
      </div>

     
        <div className="d-flex align-items-start">
        <Button color = "warning"
         onClick = {() => this.Toast()}
         style ={{marginRight : "100px"}}> KLIK INI DONG
          <Toast isOpen={this.state.Toast}toggle={() => this.toggleModal()}>
            <ToastHeader>
              Halo
            </ToastHeader>
            <ToastBody color="warning" >
              Nah muncul
            </ToastBody>
          </Toast>
          </Button>
  
        <Button
         color = "info"
        style={{marginRight:"100px"}} 
        onClick = {() => this.toggleModal()}>ADD </Button>

          </div>

        
          
      
      
      
      <Table
          style={{marginTop:"20px"}} responsive>
          <thead>
          <tr width="75%">
            <th>ID</th>
            <th>NIP</th>
            <th>NAMA</th>
            <th>TANGGAL LAHIR</th>
            <th>Jabatan</th>
            <th>EMAIL</th>
          </tr>
          </thead>
       
        <tbody>
            {this.state.resultTable.map((user,index) =>
              <tr>
                <td>{user.user_id}</td>
                <td>{user.nip}</td>
                <td>{user.nama_lengkap}</td>
                <td>{user.tgl_lahir}</td>
                <td>{user.jabatan}</td>
                <td>{user.email}</td>
                <th>
                <ButtonGroup>
                      <Button color = "warning" onClick={()=>this.setState({editNIP : user.nip, modal_edit : true})}>Edit 
                      </Button>
                      <Button color = "info"onClick={()=>(this.setState({deleteNIP : user.nip, modal_delete : true}))}>Delete
                      </Button>
                      </ButtonGroup>
                </th>
              </tr>
            )}   
        </tbody>

      </Table>
  
      <Modal isOpen={this.state.modalIsOpen} toggle={() => this.toggleModal()}>
  
      <ModalHeader toggle={() => this.toggleModal()}>UPDATE DATA!</ModalHeader>
          
          <ModalBody>
            <Label>NIP</Label>
            <div className="input-group" style={{display: "inline-flex", alignItems: "center"}} >
                <Input type="ID" style={{width: "85%"}} value={this.state.inputtedNIP} onChange={evt => this.updateInputValue(evt, "inputNIP")} name="nip" placeholder="NIP" />
              </div>

            <Label>NAMA</Label>
            <div className="input-group" style={{display: "inline-flex", alignItems: "center"}} >
                <Input type="ID" style={{width: "85%"}} value={this.state.inputtedNama} onChange={evt => this.updateInputValue(evt,"inputNama")} name="nama" placeholder="Nama" />
              </div>

            <Label>TANGGAL LAHIR</Label><div className="input-group" style={{display: "inline-flex", alignItems: "center"}} >
                <Input type="ID" style={{width: "85%"}} value={this.state.inputtedTanggalLahir} onChange={evt => this.updateInputValue(evt,"inputTanggalLahir")} name="tanggal lahir" placeholder="Tanggal lahir" />
              </div>

            <Label>JABATAN</Label>
            <div className="input-group" style={{display: "inline-flex", alignItems: "center"}} >
                <Input type="ID" style={{width: "85%"}} value={this.state.inputtedJabatan} onChange={evt => this.updateInputValue(evt, "inputJabatan")} name="jabatan" placeholder="Jabatan" />
              </div>

            <Label>EMAIL</Label>
            <div className="input-group" style={{display: "inline-flex", alignItems: "center"}} >
                <Input type="ID" style={{width: "85%"}} value={this.state.inputtedEmail} onChange={evt => this.updateInputValue(evt,"inputEmail")} name="email" placeholder="Email" />
              </div>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertUser()}>Insert
            
              <Modal isOpen={this.state.modalKonfirmasi}>
                <ModalHeader>Message</ModalHeader>
                <ModalBody>
                    data berhasil di input
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={()=> this.setState({modalKonfirmasi: false})}>Cancel
                    </Button>
                </ModalFooter>
              </Modal>

               
            </Button>{' '}
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>

        </Modal>
       
        <div>
            <Card body inverse style={{backgroundColor: '#200', borderColor: '#333'}}>
            <CardImg top width="25px" src="/assets/318x180.svg" alt=" " />
        <CardBody>
          <CardTitle><h1><strong><u>Tentang Saya</u></strong></h1></CardTitle>
          <CardSubtitle>Daniel </CardSubtitle>
          <CardText>Tak kenal maka tak sayang :) 
          </CardText>
        </CardBody>
            </Card>
        </div>

                                <Modal
                                isOpen    = {this.state.modal_edit}>
                                      <ModalHeader toggle={() => this.toggleModal()}>Edit Data</ModalHeader>
                                    <ModalBody>
                                        
                                        <Label>Nama</Label>
                                        <Input type = "text" 
                                        value = {this.state.editNama} 
                                        onChange={evt => this.updateEditValue(evt,"Nama")} name="Nama" placeholder="Nama"
                                        name = "Nama" 
                                        />
                                        <Label>Tanggal Lahir</Label>
                                        <Input type = "text" 
                                        value = {this.state.editTanggalLahir} 
                                        onChange={evt => this.updateEditValue(evt,"Tgl_Lahir")} name="Tanggal Lahir" placeholder="Tanggal Lahir"
                                        name = "Tanggal Lahir" 
                                        />
                                        <Label>Jabatan</Label>
                                        <Input type = "text" 
                                        value = {this.state.editJabatan} 
                                        onChange={evt => this.updateEditValue(evt,"Jabatan")} name="Jabatan" placeholder="Jabatan"
                                        name = "Jabatan" 
                                        />
                                        <Label>Email</Label>
                                        <Input type = "text" 
                                        value = {this.state.editEmail} 
                                        onChange={evt => this.updateEditValue(evt,"Email")} name="Email" placeholder="Email"
                                        name = "Email" 
                                        />

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color = "primary" onClick={()=>this.editUser()}>
                                            Simpan
                                        </Button>
                                        <Button color="secondary" onClick={() => this.toggleModal()}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                      
                                      <Modal
                                            isOpen = {this.state.modal_confirm_edit}
                                            >
                                            <ModalHeader>Konfirmasi Edit</ModalHeader>
                                            <ModalBody>Apakah Anda yakin ingin edit data ini?</ModalBody>
                                            <ModalFooter>
                                                <Button color = "primary">
                                                    Ya
                                                </Button>{' '}
                                                <Button
                                                    color   = "secondary">
                                                    Tidak
                                            </Button>
                                            </ModalFooter>
                                        </Modal>
                </Modal>

                <Modal isOpen = {this.state.modal_delete}>
                 
                        <ModalBody>Apakah Anda yakin ingin delete NIP </ModalBody>
                            <ModalFooter>
                                <Button color = "primary" onClick={() => this.deleteUser()}>
                                    Ya
                                </Button>{' '}
                                <Button color   = "secondary">
                                    Tidak
                                </Button>
                            </ModalFooter>     
                </Modal>
       
      </div>
      
    );
    }
}


export default App;
