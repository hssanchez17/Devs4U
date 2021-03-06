const express = require('express');
const router = express.Router();
const storage = require('./middlewares/multerConfig')
const multer = require('multer')
const upload = multer(storage)

//Middlewares
const { ensureAuthenticated, forwardAuthenticated } = require('./middlewares/auth');

//Auth Controller
const {register}=require('./controllers/auth/RegisterController')
const {login}=require('./controllers/auth/LoginController')
const {logout}=require('./controllers/auth/LogoutController')
const {checkAuthentication}=require('./controllers/auth/AuthenticationController.js')

//Controllers
const userController = require('./controllers/UserController');
const projectController=require('./controllers/ProjectController');
const projectPostulationController=require('./controllers/ProjectPostulationController');
const experienciaController=require('./controllers/ExperienciaController')
const educacionController=require('./controllers/EducacionController')
const freelancerController=require('./controllers/FreelancerController')
const contractorController=require('./controllers/ContractorController')
const reviewController=require('./controllers/ReviewController')
const searchController = require('./controllers/SearchController')
const projectStageController=require('./controllers/ProjecStageController')
const notificacionController=require('./controllers/NotificacionController')
//const projectController=require('./controllers/ProjectController');
const archivoController=require('./controllers/ArchivoController')



//Auths' Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check',checkAuthentication);

//Rutas del perfil
router.get('/profile',ensureAuthenticated, userController.consultarPerfil);
router.put('/profile/edit',ensureAuthenticated, userController.modificarPerfil);
router.put('/profile/addphoto', upload.single('image'), userController.agregarFotoPerfil);
router.delete('/profile/delete',ensureAuthenticated, userController.eliminarPerfil);

//Rutas para buscar perfil
router.post('/search/freelancer', searchController.BuscarPerfilFreelancer);
router.post('/search/contractor', searchController.BuscarPerfilContratista);
router.post('/search/project', searchController.BuscarProyecto);
router.post('/search/user', searchController.BuscarUsuario);


//Rutas experiencias usuario 
router.post('/profile/experience/add', experienciaController.agregarExperiencia)
router.put('/profile/experience/edit/:id',experienciaController.modificarExperiencia)
router.delete('/profile/experience/delete/:id',experienciaController.eliminarExperiencia)
router.get('/profile/experience/list/',experienciaController.consultarListaExperiencia)
router.get('/profile/experience/edit/list',experienciaController.modificarListaExperiencia)


//Rutas educacion usuario
router.post('/profile/education/add',educacionController.agregarEducacion)
router.put('/profile/education/edit/:id',educacionController.modificarEducacion)
router.delete('/profile/education/delete/:id',educacionController.eliminarEducacion)
router.get('/profile/education/list/',educacionController.consultarListaEducacion)
router.get('/profile/education/edit/list',educacionController.modificarListaEducacion)

//Consulta
router.post('/freelancer/view/byId/:id',freelancerController.consultarPerfilFreelancer)
router.post('/contractor/view/byId/:id',contractorController.consultarPerfilContractor)
router.post('/list/freelancers',freelancerController.listarFreelancers)
router.get('/list/contractors',contractorController.listarContractors)


//Rutas CRUD de proyecto,
router.put('/project/create',ensureAuthenticated, projectController.crearProyecto)
router.put('/project/edit/:id',ensureAuthenticated, projectController.modificarProyecto)
router.get('/project/view/:id', ensureAuthenticated,projectController.consultarProyecto)
router.delete('/project/cancel/:id', ensureAuthenticated,projectController.cancelarProyecto)
router.post('/project/list/view', ensureAuthenticated,projectController.listarProyectos)
router.post('/project/list/view/created', ensureAuthenticated,projectController.listarProyectosCreados)
router.post('/project/list/view/worked', ensureAuthenticated,projectController.listarProyectosEncargados)

router.post('/project/stage/change', ensureAuthenticated,projectController.cambiarEtapaProyecto)
router.post('/project/add/freelancer/incharge/:id',ensureAuthenticated,projectController.asignarFreelancerEncargado)
router.post('/project/change/state/review/:id',ensureAuthenticated,projectController.actualizarElEstadoDelReviewDeUnUsuarioDelProyecto)
router.post('/project/portfolio/hide',ensureAuthenticated,projectController.ocultarDePortafolio)
router.post('/project/portfolio/show',ensureAuthenticated,projectController.mostrarEnPortafolio)
router.post('/project/portfolio/list',ensureAuthenticated,projectController.mostrarPortafolioDeFreelancer)



//Archivos,,

router.post('/project/upload/file/:id',ensureAuthenticated, upload.single('image'),archivoController.subirArchivos)
router.post('/project/download/file/:id',ensureAuthenticated,archivoController.descargarArchivos)
router.post('/project/view/file/:id',ensureAuthenticated,archivoController.consultarArchivo)

router.post('/review/add/:id',reviewController.agregarReview)
router.post('/review/list/:id',reviewController.listarReviewsUsuario)
router.post('/review/mine/list',reviewController.listarMisReviewsUsuario)
router.post('/review/view/byId/:id',reviewController.consultarReview)

//Rutas Cambiar Deadline

router.post('/project/stage/chance/deadline/:id',ensureAuthenticated,projectStageController.modificarDeadline)



//Rutas postulaciones proyecto
router.put('/project/postulation/do', ensureAuthenticated,projectPostulationController.postularseProyecto)
router.post('/project/postulation/list/',ensureAuthenticated,projectPostulationController.verUsuariosPostuladosProyecto)
router.delete('/project/postulation/undo',ensureAuthenticated,projectPostulationController.deshacerPostulacionProyecto)
router.post('/freelancer/postulation/list',ensureAuthenticated,projectPostulationController.verProyectosPostuladosUsuario) 
router.post('/freelancer/postulation/check',ensureAuthenticated,projectPostulationController.verSiEstoyPostuladoProyecto) //proyectos propios




//Review
router.post('/review/add/:id',reviewController.agregarReview)
router.get('/review/list/:id',reviewController.listarReviewsUsuario)
router.post('/review/mine/list',reviewController.listarMisReviewsUsuario)
router.get('/review/view/byId/:id',reviewController.consultarReview)


//Notificaciones
router.post('/notification/list',ensureAuthenticated,notificacionController.listarTodasLasNotificaciones)
router.post('/notification/list/SinRevisar',ensureAuthenticated,notificacionController.listarNotificacionesSinRevisar)
router.post('/notificacion/update/:id',ensureAuthenticated,notificacionController.marcarLeido)


module.exports = router;