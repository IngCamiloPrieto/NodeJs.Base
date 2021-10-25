import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

class SwaggerDocs {
    private documentationEndPoint: string = '/cloud-api-documentation';

    private getSwaggerOptions() {
        const swaggerOptions = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'API CLOUD',
                    version: '1.0.0',
                    description: 'Documentation for APICloud Project',
                },
                servers: [
                    {
                        url: 'http://localhost:4004/api/v1/',
                        description: 'Development server',
                    },
                ],
                basePath: '/',
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        }
                    }
                },
                security: [{
                    bearerAuth: []
                }]
            },
            apis: ['./src/routes/*/*.ts', './src/interfaces/*/*.ts'],
        }
        return swaggerOptions;
    }

    public getswaggerUIServe() {
        return swaggerUI.serve;
    }

    public getSwaggerUISetup() {
        const swaggerDocs = swaggerJSDoc(this.getSwaggerOptions());
        return swaggerUI.setup(swaggerDocs);
    }

    public getDocumentationEndPoint() {
        return this.documentationEndPoint;
    }

    public setDocumentationEndPoint(newEndPoint: string) {
        this.documentationEndPoint = newEndPoint;
    }
}
const swaggerDocs = new SwaggerDocs();
export default swaggerDocs;