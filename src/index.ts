import express, { Request, Response, NextFunction } from 'express';
import exphbs from 'express-handlebars';
import helmet from 'helmet';
import morgan from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import swaggerDocs from './swagger/swaggerDocs';
import unitRoutes from './routes/unit/index';

//Import routes
import indexRoutes from './routes';


export const APPLICATION = 'api-cloud';

class Server {
    public app: express.Application;
    port : number;
    constructor(port : number){
        this.port = port;
        this.app = express();
        this.config();
        this.routes();
    };
    //Initializations
    config(){
        //Settings
        this.app.set('port', this.port);
        this.app.set('views', path.join( __dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            extname : '.hbs',
            layoutsDir : path.join(this.app.get('views'), 'layouts'),
            partialsDir : path.join(this.app.get('views'), 'partials'),
            helpers : require('./lib/helpers'),
            defaultLayout: 'main'
        }));
        this.app.set('view engine', '.hbs');

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(swaggerDocs.getDocumentationEndPoint(), swaggerDocs.getswaggerUIServe(), swaggerDocs.getSwaggerUISetup());

        //Static Files
        this.app.use(express.static(path.join( __dirname, 'public')));

    }

    routes(){
        //Define app Routes
        this.app.use("/api/v1/unit", unitRoutes);
        this.app.use("/",indexRoutes)


        //Catch 404 and forward to error handler
        this.app.use(function (req : Request, res : Response, next : NextFunction) {
            next(createError(404));
        });

        //Error handler
        this.app.use((err : any, req : Request, res : Response, next: NextFunction) =>{
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            const errorcode = err.status || 500;
            res.status(errorcode);
            res.render('error', {titte: 'Configurador API Error', code : errorcode, detail : err.message});
            console.log('Error Generated');
        });
    }

    //Starting the server
    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server runing on port ' + this.app.get('port'));
        });
    }
}

dotenv.config();
const server = new Server(Number(process.env.PORT) || 4004);
server.start();