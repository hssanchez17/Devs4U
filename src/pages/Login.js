import React from 'react'
import {
  Button,
  Typography,
  Grid,
  Avatar,
  CssBaseline,
  Box,
  Container,
  CircularProgress,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import { Link as DomLink, Redirect } from 'react-router-dom'
import {SERVER_ROUTE} from '../config'

import logo from './images/fondoLogin.jpg'

import Link from '@material-ui/core/Link'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: '10px'
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '480px',
    padding: '10px 12px',
    margin: '15px 5px'
    // Use the system font instead of the default Roboto font.
  }
}))(InputBase)

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/weekly?water)',
      //No puedo colocar la imagen logo
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: '#ffff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  marginGrid: {
    marginTop: theme.spacing(5)
  },
  text: {
    color: '#ffff'
  },
  mainFeaturedPost: {
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    padding: '0 10px 10px 10px',
    backgroundColor: 'rgba(62, 58, 50, 0.8)'
  }
}))

function Copyright() {
  return (
    <Typography variant="body2" color="initial" align="center">
      {'Copyright © '}
      Devs4U {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Login = (props) => {

  const [values, setValues] = React.useState({
        email: '',
        password: '',
    });
  
  const [loading, setLoading] = React.useState(false)

    const[redirect, setRedirect]=React.useState(false);
    const showDialog = (message) => {
      alert(message);
    }
   
   const[role,setRole]= React.useState('');
    const classes = useStyles();


  /*Funcion vincula el estado del componente con el valor de los campos*/
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

 

  const handleSubmit = () => {

    if(esValido()){
      setLoading(true)

              axios({ method: 'post',
                      validateStatus: function(status) {
                        return status >= 200 && status < 500; 
                      },
                      url:`/login`, 
                      withCredentials: true,
                      data: values})
                    .then(response =>{
                        console.log('login res',response)
                        if(response.status === 200){
                          showDialog('Ha iniciado sesión correctamente')
                          sessionStorage.setItem('nombre', response.data.user.nombre);
                          sessionStorage.setItem('rol', response.data.user.rol);
                          sessionStorage.setItem('foto', response.data.user.foto); 
                          sessionStorage.setItem('userId', response.data.user.id);                  
                          props.history.push(`/dashboard/${response.data.user.rol}`)
                        } 
                        else {
                          if(response.data.error !== undefined) {
                            showDialog('Error: '+response.data.error)
                          } 
                        }
                    })
                    .catch(error => {console.log('error',error)
                      showDialog('Ha ocurrido un error, intente más tarde')
                    })
          
          setLoading(false)
      }
   
  }

  const esValido = () => {
    
    let valido = true
    
    if((values.email==="") || (values.password==="")){
      showDialog('Debe rellenar todos los campos')
      valido=false
    } else if(values.email !== "" && !validateEmail(values.email)){
      valido=false
      showDialog('El correo introducido no es válido')
    }
    return valido
  }

  const validateEmail = (email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />

      {console.log(values)}
      {redirect && <Redirect to={`/dashboard/${role}`} push={true} />}
      <main>
        <CssBaseline />
        {/* Main featured post */}
        <Paper className={classes.mainFeaturedPost}>
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: 'none' }} src={logo} alt="background" />}

          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>

           {loading?(<CircularProgress/>):(
            <form className={classes.form} noValidate>
              <FormControl>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.text}>
                  Correo Electrónico
                </InputLabel>
                <BootstrapInput
                  id="email"
                  name="email"
                  onChange={handleChange('email')}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.text}>
                  Contraseña
                </InputLabel>
                <BootstrapInput
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange('password')}
                />
              </FormControl>

              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}>
                Iniciar Sesión
              </Button>

              <Grid container>
                <Grid item xs>
                  <DomLink
                    to="/password/recover"
                    style={{ textDecoration: 'none', color: 'rgb(33,40,53)' }}>
                    <Link variant="body2" className={classes.text}>
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </DomLink>
                </Grid>
                <Grid item>
                  <DomLink
                    to="/register"
                    style={{ textDecoration: 'none', color: 'rgb(33,40,53)' }}>
                    <Link variant="body2" className={classes.text}>
                      {'¿No tienes una cuenta? Regístrate'}
                    </Link>
                  </DomLink>
                </Grid>
              </Grid>
            </form>
           )}

          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Paper>
      </main>
    </Container>
  )
}

export default Login
